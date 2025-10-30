<?php

namespace App\Services\Assessment;

use App\Models\UserAssessmentAttempt;
use Illuminate\Support\Collection;

class SkillsScoringService
{
    /**
     * Calculate skills scores from assessment responses.
     */
    public function calculateScores(UserAssessmentAttempt $attempt): array
    {
        $responses = $attempt->responses()
            ->with('question')
            ->get();

        if ($responses->isEmpty()) {
            return $this->getEmptyScores();
        }

        // Group responses by skill domain
        $domainScores = $responses->groupBy(function ($response) {
            return $response->question->category;
        })->map(function (Collection $domainResponses) {
            // Calculate average score for domain (1-5 scale converted to 0-100)
            $average = $domainResponses->avg('response_value');

            return round((($average - 1) / 4) * 100, 1); // Convert 1-5 to 0-100
        });

        // Determine proficiency levels
        $proficiencies = $domainScores->map(function ($score) {
            return $this->getProficiencyLevel($score);
        });

        // Identify strengths and growth areas
        $strengths = $domainScores->filter(fn ($score) => $score >= 75)->keys()->all();
        $growthAreas = $domainScores->filter(fn ($score) => $score < 50)->keys()->all();

        return [
            'domains' => $domainScores->all(),
            'proficiencies' => $proficiencies->all(),
            'strengths' => $strengths,
            'growth_areas' => $growthAreas,
            'overall_score' => round($domainScores->avg(), 1),
        ];
    }

    /**
     * Get proficiency level for a score.
     */
    protected function getProficiencyLevel(float $score): string
    {
        return match (true) {
            $score >= 90 => 'Expert',
            $score >= 75 => 'Advanced',
            $score >= 60 => 'Proficient',
            $score >= 40 => 'Intermediate',
            default => 'Novice',
        };
    }

    /**
     * Get empty scores structure.
     */
    protected function getEmptyScores(): array
    {
        return [
            'domains' => [
                'Cognitive' => 0,
                'Technical' => 0,
                'Social' => 0,
                'Management' => 0,
                'Creative' => 0,
            ],
            'proficiencies' => [
                'Cognitive' => 'Novice',
                'Technical' => 'Novice',
                'Social' => 'Novice',
                'Management' => 'Novice',
                'Creative' => 'Novice',
            ],
            'strengths' => [],
            'growth_areas' => [],
            'overall_score' => 0,
        ];
    }
}
