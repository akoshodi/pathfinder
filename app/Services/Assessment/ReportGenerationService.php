<?php

namespace App\Services\Assessment;

use App\Models\AssessmentReport;
use App\Models\PersonalityTrait;
use App\Models\UserAssessmentAttempt;

class ReportGenerationService
{
    public function __construct(
        protected RiasecScoringService $riasecService = new RiasecScoringService,
        protected CareerMatchingService $matchingService = new CareerMatchingService,
        protected SkillScoringService $skillService = new SkillScoringService,
        protected PersonalityScoringService $personalityService = new PersonalityScoringService,
    ) {}

    /**
     * Generate comprehensive assessment report
     */
    public function generate(UserAssessmentAttempt $attempt): AssessmentReport
    {
        // Check if report already exists
        if ($attempt->report) {
            return $attempt->report;
        }

        $assessmentType = $attempt->assessmentType;
        // Some installs may not have a dedicated category column; fallback to slug mapping
        $category = $assessmentType->category ?? match ($assessmentType->slug) {
            'riasec' => 'career_interest',
            'skills' => 'skills',
            'personality' => 'personality',
            default => null,
        };

        // Generate scores based on assessment type
        match ($category) {
            'career_interest' => $this->generateRiasecScores($attempt),
            'skills' => $this->generateSkillScores($attempt),
            'personality' => $this->generatePersonalityScores($attempt),
            default => null,
        };

        // Create report
        $report = AssessmentReport::create([
            'user_id' => $attempt->user_id,
            'attempt_id' => $attempt->id,
            'report_type' => match ($category) {
                'career_interest' => 'interest',
                'skills' => 'skills',
                'personality' => 'personality',
                default => 'comprehensive',
            },
            'title' => match ($category) {
                'career_interest' => 'Career Interest Report',
                'skills' => 'Skills Assessment Report',
                'personality' => 'Personality Profile Report',
                default => ($assessmentType->name ?? 'Assessment Report'),
            },
            'summary' => $this->generateSummary($attempt),
            'top_traits' => $this->extractTopTraits($attempt),
            // Persist strengths and growth areas according to schema
            'strengths' => $this->extractTopTraits($attempt),
            'growth_areas' => $this->generateGrowthAreas($attempt, $category),
            'visualization_data' => $this->generateVisualizationData($attempt),
            'generated_at' => now(),
        ]);

        // Generate career recommendations
        $this->generateCareerRecommendations($attempt, $report);

        return $report;
    }

    /**
     * Generate RIASEC scores
     */
    protected function generateRiasecScores(UserAssessmentAttempt $attempt): void
    {
        $this->riasecService->calculateScores($attempt);
    }

    /**
     * Generate skill proficiency scores
     */
    protected function generateSkillScores(UserAssessmentAttempt $attempt): void
    {
        $this->skillService->calculateScores($attempt);
    }

    /**
     * Generate personality trait scores
     */
    protected function generatePersonalityScores(UserAssessmentAttempt $attempt): void
    {
        $this->personalityService->calculateScores($attempt);
    }

    /**
     * Generate summary text
     */
    protected function generateSummary(UserAssessmentAttempt $attempt): string
    {
        $assessmentType = $attempt->assessmentType;
        $category = $assessmentType->category ?? match ($assessmentType->slug) {
            'riasec' => 'career_interest',
            'skills' => 'skills',
            'personality' => 'personality',
            default => null,
        };

        return match ($category) {
            'career_interest' => $this->generateRiasecSummary($attempt),
            'skills' => $this->generateSkillsSummary($attempt),
            'personality' => $this->generatePersonalitySummary($attempt),
            default => 'Assessment completed successfully.',
        };
    }

    /**
     * Generate RIASEC summary
     */
    protected function generateRiasecSummary(UserAssessmentAttempt $attempt): string
    {
        $riasecScore = $attempt->riasecScore;
        if (! $riasecScore) {
            return 'Your career interest assessment has been completed.';
        }

        $hollandCode = $riasecScore->holland_code;
        $topCodes = $riasecScore->getTopThreeCodes();
        $descriptions = $this->riasecService->getCodeDescriptions();

        $primaryName = $descriptions[$topCodes[0]]['name'];
        $secondaryName = $descriptions[$topCodes[1]]['name'];

        return "Your Holland Code is {$hollandCode}, with {$primaryName} as your primary career interest, followed by {$secondaryName}. This profile suggests you would thrive in careers that combine these elements.";
    }

    /**
     * Generate skills summary
     */
    protected function generateSkillsSummary(UserAssessmentAttempt $attempt): string
    {
        $proficiencies = $attempt->skillProficiencies()->get();
        if ($proficiencies->isEmpty()) {
            return 'Your skills assessment has been completed.';
        }

        $top = $proficiencies->sortByDesc('proficiency_level')->take(2)->pluck('skill_domain')->all();
        if (count($top) >= 2) {
            return "Your strongest skill domains are {$top[0]} and {$top[1]}. Keep leveraging these strengths while targeting growth in other areas.";
        }

        return "Your strongest skill domain is {$top[0]}. Keep leveraging this strength while targeting growth in other areas.";
    }

    /**
     * Generate personality summary
     */
    protected function generatePersonalitySummary(UserAssessmentAttempt $attempt): string
    {
        /** @var PersonalityTrait|null $trait */
        $trait = $attempt->personalityTrait;
        if (! $trait) {
            return 'Your personality assessment has been completed.';
        }

        $summary = $trait->getPersonalitySummary();

        return ucfirst($summary).'.';
    }

    /**
     * Extract top traits from assessment
     */
    protected function extractTopTraits(UserAssessmentAttempt $attempt): array
    {
        $assessmentType = $attempt->assessmentType;
        $category = $assessmentType->category ?? match ($assessmentType->slug) {
            'riasec' => 'career_interest',
            'skills' => 'skills',
            'personality' => 'personality',
            default => null,
        };

        return match ($category) {
            'career_interest' => $this->extractRiasecTraits($attempt),
            'skills' => $this->extractSkillTraits($attempt),
            'personality' => $this->extractPersonalityTraits($attempt),
            default => [],
        };
    }

    /**
     * Extract RIASEC traits
     */
    protected function extractRiasecTraits(UserAssessmentAttempt $attempt): array
    {
        $riasecScore = $attempt->riasecScore;
        if (! $riasecScore) {
            return [];
        }

        $topCodes = $riasecScore->getTopThreeCodes();
        $descriptions = $this->riasecService->getCodeDescriptions();

        $traits = [];
        foreach ($topCodes as $code) {
            $traits = array_merge($traits, array_slice($descriptions[$code]['traits'], 0, 2));
        }

        return array_unique($traits);
    }

    /**
     * Extract skill traits
     */
    protected function extractSkillTraits(UserAssessmentAttempt $attempt): array
    {
        $proficiencies = $attempt->skillProficiencies()->get();
        if ($proficiencies->isEmpty()) {
            return [];
        }

        return $proficiencies
            ->sortByDesc('proficiency_level')
            ->take(3)
            ->pluck('skill_domain')
            ->values()
            ->all();
    }

    /**
     * Extract personality traits
     */
    protected function extractPersonalityTraits(UserAssessmentAttempt $attempt): array
    {
        /** @var PersonalityTrait|null $trait */
        $trait = $attempt->personalityTrait;
        if (! $trait) {
            return [];
        }

        $scores = $trait->getBigFiveScores();
        arsort($scores);

        return array_slice(array_keys($scores), 0, 3);
    }

    /**
     * Generate insights
     */
    public function generateInsights(UserAssessmentAttempt $attempt): array
    {
        $insights = [];
        $assessmentType = $attempt->assessmentType;
        $category = $assessmentType->category ?? match ($assessmentType->slug) {
            'riasec' => 'career_interest',
            'skills' => 'skills',
            'personality' => 'personality',
            default => null,
        };

        if ($category === 'career_interest') {
            $riasecScore = $attempt->riasecScore;
            if ($riasecScore) {
                $topCodes = $riasecScore->getTopThreeCodes();
                $descriptions = $this->riasecService->getCodeDescriptions();

                foreach ($topCodes as $code) {
                    $insights[] = [
                        'title' => $descriptions[$code]['name'].' Interests',
                        'description' => $descriptions[$code]['description'],
                        'work_environments' => $descriptions[$code]['work_environments'],
                    ];
                }
            }
        }

        return $insights;
    }

    /**
     * Generate recommendations
     */
    public function generateRecommendations(UserAssessmentAttempt $attempt): array
    {
        $recommendations = [];

        $recommendations[] = 'Explore the career matches provided to discover roles that align with your profile.';
        $recommendations[] = 'Consider taking additional assessments to get a more comprehensive view of your career fit.';
        $recommendations[] = 'Review the learning paths to develop skills for your target careers.';

        return $recommendations;
    }

    /**
     * Generate visualization data for charts
     */
    protected function generateVisualizationData(UserAssessmentAttempt $attempt): array
    {
        $assessmentType = $attempt->assessmentType;
        $category = $assessmentType->category ?? match ($assessmentType->slug) {
            'riasec' => 'career_interest',
            'skills' => 'skills',
            'personality' => 'personality',
            default => null,
        };

        return match ($category) {
            'career_interest' => $this->generateRiasecVisualization($attempt),
            'skills' => $this->generateSkillsVisualization($attempt),
            'personality' => $this->generatePersonalityVisualization($attempt),
            default => [],
        };
    }

    /**
     * Generate RIASEC visualization data
     */
    protected function generateRiasecVisualization(UserAssessmentAttempt $attempt): array
    {
        $riasecScore = $attempt->riasecScore;
        if (! $riasecScore) {
            return [];
        }

        $allScores = $riasecScore->getAllScores();
        $distribution = $this->riasecService->getScoreDistribution($riasecScore);

        return [
            'type' => 'radar',
            'labels' => ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'],
            'datasets' => [
                [
                    'label' => 'Your Scores',
                    'data' => array_values($allScores),
                ],
            ],
            'distribution' => $distribution,
        ];
    }

    /**
     * Generate skills visualization data
     */
    protected function generateSkillsVisualization(UserAssessmentAttempt $attempt): array
    {
        $proficiencies = $attempt->skillProficiencies()->get();
        if ($proficiencies->isEmpty()) {
            return [];
        }

        $labels = $proficiencies->pluck('skill_domain')->all();
        $data = $proficiencies->pluck('proficiency_level')->all();

        return [
            'type' => 'bar',
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'Proficiency (%)',
                    'data' => $data,
                ],
            ],
        ];
    }

    /**
     * Generate personality visualization data
     */
    protected function generatePersonalityVisualization(UserAssessmentAttempt $attempt): array
    {
        /** @var PersonalityTrait|null $trait */
        $trait = $attempt->personalityTrait;
        if (! $trait) {
            return [];
        }

        $scores = $trait->getBigFiveScores();

        return [
            'type' => 'bar',
            'labels' => array_keys($scores),
            'datasets' => [
                [
                    'label' => 'Trait Score',
                    'data' => array_values($scores),
                ],
            ],
        ];
    }

    /**
     * Generate career recommendations
     */
    protected function generateCareerRecommendations(UserAssessmentAttempt $attempt, AssessmentReport $report): void
    {
        $assessmentType = $attempt->assessmentType;
        $category = $assessmentType->category ?? match ($assessmentType->slug) {
            'riasec' => 'career_interest',
            'skills' => 'skills',
            'personality' => 'personality',
            default => null,
        };

        if ($category === 'career_interest') {
            $riasecScore = $attempt->riasecScore;
            if ($riasecScore) {
                $this->matchingService->matchCareersFromRiasec($riasecScore, $report);
            }
        } elseif ($category === 'skills') {
            $this->matchingService->matchCareersFromSkills($attempt, $report);
        }
    }

    /**
     * Build growth areas array aligned to schema using category-specific logic
     */
    protected function generateGrowthAreas(UserAssessmentAttempt $attempt, ?string $category): array
    {
        if ($category === 'skills') {
            // Convert skill recommendations into a concise list of actions
            $items = [];
            foreach ($this->skillService->generateRecommendations($attempt) as $rec) {
                $items[] = $rec['suggestion'];
                foreach (($rec['actions'] ?? []) as $action) {
                    $items[] = $action;
                }
            }

            // Deduplicate and limit for brevity
            return array_values(array_slice(array_unique($items), 0, 10));
        }

        // Generic fallbacks
        return [
            'Explore recommended careers and note required skills.',
            'Create a simple 30-day learning plan for one growth area.',
        ];
    }
}
