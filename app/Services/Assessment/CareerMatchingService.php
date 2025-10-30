<?php

namespace App\Services\Assessment;

use App\Models\AssessmentReport;
use App\Models\CareerRecommendation;
use App\Models\RiasecScore;
use App\Models\UserAssessmentAttempt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CareerMatchingService
{
    /**
     * Generate career recommendations based on RIASEC scores
     */
    public function matchCareersFromRiasec(RiasecScore $riasecScore, AssessmentReport $report, int $limit = 10): array
    {
        // If ONET tables are not available (e.g., in isolated tests), skip matching gracefully
        if (! Schema::hasTable('onet_interests') || ! Schema::hasTable('onet_occupation_data') || ! Schema::hasTable('onet_content_model_reference')) {
            return [];
        }
        $hollandCode = $riasecScore->holland_code;
        $primaryCode = $riasecScore->primary_code;

        // Query ONET occupations with matching interest profiles
        $occupations = DB::table('onet_interests')
            ->join('onet_occupation_data', 'onet_interests.onetsoc_code', '=', 'onet_occupation_data.onetsoc_code')
            ->join('onet_content_model_reference', 'onet_interests.element_id', '=', 'onet_content_model_reference.element_id')
            ->where('onet_interests.scale_id', 'OI') // Occupational Interest scale
            ->where(function ($query) use ($primaryCode, $hollandCode) {
                // Match on primary code (RIASEC letter in element name)
                $query->where('onet_content_model_reference.element_name', 'LIKE', "%{$primaryCode}%")
                    ->orWhere('onet_content_model_reference.element_name', 'LIKE', "%{$hollandCode}%");
            })
            ->select(
                'onet_occupation_data.onetsoc_code',
                'onet_occupation_data.title',
                'onet_occupation_data.description',
                DB::raw('AVG(onet_interests.data_value) as interest_match')
            )
            ->groupBy('onet_occupation_data.onetsoc_code', 'onet_occupation_data.title', 'onet_occupation_data.description')
            ->orderByDesc('interest_match')
            ->limit($limit * 2) // Get more for filtering
            ->get();

        $recommendations = [];
        $rank = 1;

        foreach ($occupations as $occupation) {
            if ($rank > $limit) {
                break;
            }

            $matchScore = $this->calculateMatchScore($riasecScore, $occupation);

            if ($matchScore >= 50) { // Minimum threshold
                $recommendation = CareerRecommendation::create([
                    'report_id' => $report->id,
                    'onetsoc_code' => $occupation->onetsoc_code,
                    'match_score' => $matchScore,
                    'match_reasons' => $this->generateMatchReasons($riasecScore, $occupation),
                    'skill_gaps' => $this->identifySkillGaps($occupation->onetsoc_code),
                    'education_requirements' => $this->getEducationRequirements($occupation->onetsoc_code),
                    'learning_paths' => $this->suggestLearningPaths($occupation->onetsoc_code),
                    'rank' => $rank,
                ]);

                $recommendations[] = $recommendation;
                $rank++;
            }
        }

        return $recommendations;
    }

    /**
     * Calculate overall match score (0-100)
     */
    protected function calculateMatchScore(RiasecScore $riasecScore, $occupation): float
    {
        $baseScore = $occupation->interest_match ?? 50;

        // Weight by primary/secondary code alignment
        $allScores = $riasecScore->getAllScores();
        $topScore = max($allScores);

        // Normalize to 0-100 scale
        $normalizedScore = ($baseScore / 5) * 100; // ONET scale is typically 0-5

        // Apply bonus for strong alignment
        if ($normalizedScore >= 70 && $topScore >= 20) {
            $normalizedScore = min(95, $normalizedScore * 1.1);
        }

        // Integrate Abilities: incorporate average importance of top abilities for the occupation
        // This provides a secondary signal beyond interests
        $abilityAvg = null;
        if (Schema::hasTable('onet_abilities')) {
            $abilityAvg = DB::table('onet_abilities')
                ->where('onetsoc_code', $occupation->onetsoc_code)
                ->where('scale_id', 'IM') // Importance
                ->avg('data_value');
        }

        $abilityScore = $abilityAvg ? ($abilityAvg / 5) * 100 : 50; // default neutral if missing

        // Blend scores with heavier weight on interests
        $combined = (0.8 * $normalizedScore) + (0.2 * $abilityScore);

        return round($combined, 2);
    }

    /**
     * Generate match reasons
     */
    protected function generateMatchReasons(RiasecScore $riasecScore, $occupation): array
    {
        $reasons = [];
        $topCodes = $riasecScore->getTopThreeCodes();
        $codeDescriptions = (new RiasecScoringService)->getCodeDescriptions();

        foreach ($topCodes as $code) {
            $reasons[] = "Strong alignment with {$codeDescriptions[$code]['name']} interests";
        }

        $reasons[] = "Career utilizes your {$codeDescriptions[$topCodes[0]]['traits'][0]} and {$codeDescriptions[$topCodes[0]]['traits'][1]} traits";

        return $reasons;
    }

    /**
     * Identify skill gaps by comparing user skills to occupation requirements
     */
    protected function identifySkillGaps(string $onetsocCode): array
    {
        if (! Schema::hasTable('onet_skills') || ! Schema::hasTable('onet_content_model_reference')) {
            return [];
        }
        $requiredSkills = DB::table('onet_skills')
            ->join('onet_content_model_reference', 'onet_skills.element_id', '=', 'onet_content_model_reference.element_id')
            ->where('onet_skills.onetsoc_code', $onetsocCode)
            ->where('onet_skills.scale_id', 'IM') // Importance scale
            ->where('onet_skills.data_value', '>=', 3.5) // High importance
            ->orderByDesc('onet_skills.data_value')
            ->limit(5)
            ->pluck('onet_content_model_reference.element_name')
            ->toArray();

        return $requiredSkills;
    }

    /**
     * Get education requirements from ONET
     */
    protected function getEducationRequirements(string $onetsocCode): array
    {
        if (! Schema::hasTable('onet_education_training_experience') || ! Schema::hasTable('onet_content_model_reference')) {
            return [];
        }
        $education = DB::table('onet_education_training_experience')
            ->join('onet_content_model_reference', 'onet_education_training_experience.element_id', '=', 'onet_content_model_reference.element_id')
            ->where('onet_education_training_experience.onetsoc_code', $onetsocCode)
            ->where('onet_education_training_experience.scale_id', 'RL') // Required Level
            ->orderByDesc('onet_education_training_experience.data_value')
            ->limit(3)
            ->get(['onet_content_model_reference.element_name', 'onet_education_training_experience.data_value'])
            ->map(fn ($item) => [
                'level' => $item->element_name,
                'importance' => $item->data_value,
            ])
            ->toArray();

        return $education;
    }

    /**
     * Suggest learning paths (courses, certifications)
     */
    protected function suggestLearningPaths(string $onetsocCode): array
    {
        // This would ideally query your courses/programs database
        // For now, return generic suggestions based on skills needed

        $skills = $this->identifySkillGaps($onetsocCode);

        $paths = [];
        foreach (array_slice($skills, 0, 3) as $skill) {
            $paths[] = [
                'type' => 'Course',
                'title' => "Develop {$skill} Skills",
                'description' => "Build proficiency in {$skill} to excel in this career",
            ];
        }

        return $paths;
    }

    /**
     * Match careers based on skills assessment
     */
    public function matchCareersFromSkills(UserAssessmentAttempt $attempt, AssessmentReport $report, int $limit = 10): array
    {
        if (! Schema::hasTable('onet_skills') || ! Schema::hasTable('onet_occupation_data') || ! Schema::hasTable('onet_content_model_reference')) {
            return [];
        }
        $skillProficiencies = $attempt->skillProficiencies;

        // Get user's strongest skills
        $strongSkills = $skillProficiencies->filter(function ($skill) {
            return $skill->isStrength();
        })->pluck('skill_name')->toArray();

        if (empty($strongSkills)) {
            return [];
        }

        // Find occupations requiring these skills
        $occupations = DB::table('onet_skills')
            ->join('onet_occupation_data', 'onet_skills.onetsoc_code', '=', 'onet_occupation_data.onetsoc_code')
            ->join('onet_content_model_reference', 'onet_skills.element_id', '=', 'onet_content_model_reference.element_id')
            ->whereIn('onet_content_model_reference.element_name', $strongSkills)
            ->where('onet_skills.scale_id', 'IM')
            ->select(
                'onet_occupation_data.onetsoc_code',
                'onet_occupation_data.title',
                DB::raw('COUNT(*) as skill_matches'),
                DB::raw('AVG(onet_skills.data_value) as skill_importance')
            )
            ->groupBy('onet_occupation_data.onetsoc_code', 'onet_occupation_data.title')
            ->orderByDesc('skill_matches')
            ->orderByDesc('skill_importance')
            ->limit($limit)
            ->get();

        $recommendations = [];
        $rank = 1;

        foreach ($occupations as $occupation) {
            $matchScore = min(95, ($occupation->skill_matches / count($strongSkills)) * 100);

            $recommendation = CareerRecommendation::create([
                'report_id' => $report->id,
                'onetsoc_code' => $occupation->onetsoc_code,
                'match_score' => round($matchScore, 2),
                'match_reasons' => [
                    "Matches {$occupation->skill_matches} of your strongest skills",
                    'High alignment with your demonstrated competencies',
                ],
                'skill_gaps' => $this->identifySkillGaps($occupation->onetsoc_code),
                'education_requirements' => $this->getEducationRequirements($occupation->onetsoc_code),
                'learning_paths' => $this->suggestLearningPaths($occupation->onetsoc_code),
                'rank' => $rank,
            ]);

            $recommendations[] = $recommendation;
            $rank++;
        }

        return $recommendations;
    }
}
