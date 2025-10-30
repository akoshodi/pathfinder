<?php

namespace App\Services\Assessment;

use App\Models\User;
use App\Models\UserAssessmentAttempt;

class CareerFitAnalysisService
{
    public function __construct(
        protected CareerMatchingService $careerMatching
    ) {}

    /**
     * Generate comprehensive career fit analysis from multiple assessments.
     */
    public function analyzeCareerFit(User $user): array
    {
        // Get completed assessments
        $riasecAttempt = $this->getLatestCompletedAttempt($user, 'riasec');
        $skillsAttempt = $this->getLatestCompletedAttempt($user, 'skills');
        $personalityAttempt = $this->getLatestCompletedAttempt($user, 'personality');

        if (! $riasecAttempt || ! $skillsAttempt || ! $personalityAttempt) {
            throw new \Exception('All three assessments (RIASEC, Skills, Personality) must be completed for career fit analysis.');
        }

        // Extract scores
        $riasecScores = json_decode($riasecAttempt->normalized_scores, true) ?? [];
        $skillsScores = json_decode($skillsAttempt->normalized_scores, true) ?? [];
        $personalityScores = json_decode($personalityAttempt->normalized_scores, true) ?? [];

        // Get career recommendations with combined scoring
        $careerMatches = $this->calculateCareerMatches($riasecScores, $skillsScores, $personalityScores);

        // Analyze skill gaps
        $skillGaps = $this->analyzeSkillGaps($skillsScores, $careerMatches);

        // Generate learning paths
        $learningPaths = $this->generateLearningPaths($skillGaps, $careerMatches);

        // Build comprehensive profile
        $profile = $this->buildUserProfile($riasecScores, $skillsScores, $personalityScores);

        return [
            'profile' => $profile,
            'career_matches' => $careerMatches,
            'skill_gaps' => $skillGaps,
            'learning_paths' => $learningPaths,
            'assessment_dates' => [
                'riasec' => $riasecAttempt->completed_at,
                'skills' => $skillsAttempt->completed_at,
                'personality' => $personalityAttempt->completed_at,
            ],
            'overall_readiness' => $this->calculateOverallReadiness($skillsScores, $careerMatches),
        ];
    }

    /**
     * Calculate career matches using weighted combination of assessments.
     */
    protected function calculateCareerMatches(array $riasec, array $skills, array $personality): array
    {
        // Get base career recommendations from RIASEC
        $riasecCareerData = $riasec['riasec'] ?? [];
        $topCodes = array_slice(array_keys($riasecCareerData), 0, 3);

        $careers = $this->careerMatching->matchCareersFromRiasec($riasecCareerData);

        // Enhance each career with skills and personality fit
        return collect($careers)->map(function ($career) use ($skills, $personality, $riasec) {
            $interestScore = $this->calculateInterestFit($career, $riasec);
            $skillsScore = $this->calculateSkillsFit($career, $skills);
            $personalityScore = $this->calculatePersonalityFit($career, $personality);

            // Weighted composite score (interests 40%, skills 35%, personality 25%)
            $compositeScore = (
                ($interestScore * 0.4) +
                ($skillsScore * 0.35) +
                ($personalityScore * 0.25)
            );

            return array_merge($career, [
                'interest_fit' => round($interestScore, 1),
                'skills_fit' => round($skillsScore, 1),
                'personality_fit' => round($personalityScore, 1),
                'composite_score' => round($compositeScore, 1),
                'fit_explanation' => $this->generateFitExplanation($interestScore, $skillsScore, $personalityScore),
            ]);
        })
            ->sortByDesc('composite_score')
            ->take(15)
            ->values()
            ->all();
    }

    /**
     * Calculate interest fit based on RIASEC alignment.
     */
    protected function calculateInterestFit(array $career, array $riasec): float
    {
        $careerRiasec = $career['required_interests'] ?? [];
        $userRiasec = $riasec['riasec'] ?? [];

        if (empty($careerRiasec) || empty($userRiasec)) {
            return 50.0; // Neutral if no data
        }

        $alignment = 0;
        $totalWeight = 0;

        foreach ($careerRiasec as $code => $weight) {
            $userScore = $userRiasec[$code] ?? 0;
            $alignment += ($userScore / 100) * $weight;
            $totalWeight += $weight;
        }

        return $totalWeight > 0 ? ($alignment / $totalWeight) * 100 : 50.0;
    }

    /**
     * Calculate skills fit based on domain proficiency.
     */
    protected function calculateSkillsFit(array $career, array $skills): float
    {
        $requiredSkills = $career['required_skills'] ?? [];
        $userSkills = $skills['domains'] ?? [];

        if (empty($requiredSkills) || empty($userSkills)) {
            return 60.0; // Slight positive if no data
        }

        $matches = 0;
        $total = 0;

        foreach ($requiredSkills as $skill => $importance) {
            $userLevel = $userSkills[$skill] ?? 0;
            $matches += min($userLevel, $importance * 20); // Scale to 100
            $total += $importance * 20;
        }

        return $total > 0 ? ($matches / $total) * 100 : 60.0;
    }

    /**
     * Calculate personality fit based on Big Five traits.
     */
    protected function calculatePersonalityFit(array $career, array $personality): float
    {
        $idealTraits = $career['ideal_personality'] ?? [];
        $userTraits = $personality['traits'] ?? [];

        if (empty($idealTraits) || empty($userTraits)) {
            return 65.0; // Neutral-positive if no data
        }

        $alignment = 0;
        $count = 0;

        foreach ($idealTraits as $trait => $idealValue) {
            $userValue = $userTraits[$trait] ?? 3.0;
            // Calculate alignment (lower difference = better fit)
            $difference = abs($userValue - $idealValue);
            $alignment += (4 - $difference) / 4; // Normalize to 0-1
            $count++;
        }

        return $count > 0 ? ($alignment / $count) * 100 : 65.0;
    }

    /**
     * Analyze skill gaps for top career matches.
     */
    protected function analyzeSkillGaps(array $skillsScores, array $careerMatches): array
    {
        $userSkills = $skillsScores['domains'] ?? [];
        $gaps = [];

        foreach (array_slice($careerMatches, 0, 5) as $career) {
            $requiredSkills = $career['required_skills'] ?? [];
            $careerGaps = [];

            foreach ($requiredSkills as $skill => $importance) {
                $userLevel = $userSkills[$skill] ?? 0;
                $requiredLevel = $importance * 20; // Scale to 100

                if ($userLevel < $requiredLevel) {
                    $careerGaps[] = [
                        'skill' => $skill,
                        'current_level' => $userLevel,
                        'required_level' => $requiredLevel,
                        'gap' => $requiredLevel - $userLevel,
                        'priority' => $importance >= 4 ? 'High' : ($importance >= 3 ? 'Medium' : 'Low'),
                    ];
                }
            }

            if (! empty($careerGaps)) {
                $gaps[$career['title']] = collect($careerGaps)->sortByDesc('gap')->values()->all();
            }
        }

        return $gaps;
    }

    /**
     * Generate personalized learning paths.
     */
    protected function generateLearningPaths(array $skillGaps, array $careerMatches): array
    {
        $paths = [];

        foreach ($skillGaps as $careerTitle => $gaps) {
            $career = collect($careerMatches)->firstWhere('title', $careerTitle);

            if (! $career) {
                continue;
            }

            $highPriorityGaps = collect($gaps)->where('priority', 'High')->take(3);
            $mediumPriorityGaps = collect($gaps)->where('priority', 'Medium')->take(2);

            $path = [
                'career' => $careerTitle,
                'onetsoc_code' => $career['onetsoc_code'] ?? null,
                'timeframe' => $this->estimateTimeframe($gaps),
                'priority_skills' => $highPriorityGaps->pluck('skill')->all(),
                'phases' => [],
            ];

            // Phase 1: Foundation (High priority gaps)
            if ($highPriorityGaps->isNotEmpty()) {
                $path['phases'][] = [
                    'phase' => 1,
                    'title' => 'Build Foundation',
                    'duration' => '3-6 months',
                    'skills' => $highPriorityGaps->map(fn ($gap) => [
                        'skill' => $gap['skill'],
                        'target_level' => $gap['required_level'],
                        'resources' => $this->suggestResources($gap['skill']),
                    ])->all(),
                ];
            }

            // Phase 2: Intermediate (Medium priority gaps)
            if ($mediumPriorityGaps->isNotEmpty()) {
                $path['phases'][] = [
                    'phase' => 2,
                    'title' => 'Develop Proficiency',
                    'duration' => '3-6 months',
                    'skills' => $mediumPriorityGaps->map(fn ($gap) => [
                        'skill' => $gap['skill'],
                        'target_level' => $gap['required_level'],
                        'resources' => $this->suggestResources($gap['skill']),
                    ])->all(),
                ];
            }

            // Phase 3: Advanced (Career-specific)
            $path['phases'][] = [
                'phase' => 3,
                'title' => 'Career Readiness',
                'duration' => '2-4 months',
                'focus' => [
                    'Portfolio development',
                    'Industry certifications',
                    'Networking and mentorship',
                    'Job search preparation',
                ],
            ];

            $paths[] = $path;
        }

        return $paths;
    }

    /**
     * Build comprehensive user profile.
     */
    protected function buildUserProfile(array $riasec, array $skills, array $personality): array
    {
        $riasecData = $riasec['riasec'] ?? [];
        $skillsData = $skills['domains'] ?? [];
        $personalityData = $personality['traits'] ?? [];

        // Determine top RIASEC codes
        arsort($riasecData);
        $topInterests = array_slice(array_keys($riasecData), 0, 3);

        // Determine top skills
        arsort($skillsData);
        $topSkills = array_slice(array_keys($skillsData), 0, 3);

        // Analyze personality
        $personalityInsights = $this->generatePersonalityInsights($personalityData);

        return [
            'interest_profile' => [
                'primary_codes' => $topInterests,
                'holland_code' => implode('', $topInterests),
                'scores' => $riasecData,
            ],
            'skills_profile' => [
                'strengths' => array_filter($skillsData, fn ($score) => $score >= 75),
                'developing' => array_filter($skillsData, fn ($score) => $score >= 50 && $score < 75),
                'growth_areas' => array_filter($skillsData, fn ($score) => $score < 50),
            ],
            'personality_profile' => [
                'traits' => $personalityData,
                'insights' => $personalityInsights,
            ],
        ];
    }

    /**
     * Generate personality insights based on Big Five scores.
     */
    protected function generatePersonalityInsights(array $traits): array
    {
        $insights = [];

        foreach ($traits as $trait => $score) {
            if ($score >= 4.0) {
                $insights[] = "High {$trait}: ".$this->getTraitInsight($trait, 'high');
            } elseif ($score <= 2.5) {
                $insights[] = "Low {$trait}: ".$this->getTraitInsight($trait, 'low');
            }
        }

        return $insights;
    }

    /**
     * Get trait-specific insights.
     */
    protected function getTraitInsight(string $trait, string $level): string
    {
        $insights = [
            'Openness' => [
                'high' => 'You embrace new experiences and enjoy intellectual exploration.',
                'low' => 'You prefer familiar routines and practical approaches.',
            ],
            'Conscientiousness' => [
                'high' => 'You are organized, reliable, and goal-oriented.',
                'low' => 'You are flexible and spontaneous in your approach.',
            ],
            'Extraversion' => [
                'high' => 'You thrive in social settings and collaborative environments.',
                'low' => 'You prefer independent work and quieter settings.',
            ],
            'Agreeableness' => [
                'high' => 'You value harmony and work well in team settings.',
                'low' => 'You are direct and comfortable with competitive environments.',
            ],
            'Emotional Stability' => [
                'high' => 'You remain calm and resilient under pressure.',
                'low' => 'You may be sensitive to stress and emotional situations.',
            ],
        ];

        return $insights[$trait][$level] ?? '';
    }

    /**
     * Calculate overall career readiness score.
     */
    protected function calculateOverallReadiness(array $skillsScores, array $careerMatches): array
    {
        $topMatch = $careerMatches[0] ?? null;

        if (! $topMatch) {
            return ['score' => 0, 'level' => 'Insufficient Data'];
        }

        $compositeScore = $topMatch['composite_score'];
        $skillsFit = $topMatch['skills_fit'];

        $readiness = ($compositeScore + $skillsFit) / 2;

        $level = match (true) {
            $readiness >= 80 => 'Career Ready',
            $readiness >= 65 => 'Nearly Ready',
            $readiness >= 50 => 'Developing',
            default => 'Early Stage',
        };

        return [
            'score' => round($readiness, 1),
            'level' => $level,
            'top_career' => $topMatch['title'],
        ];
    }

    /**
     * Generate fit explanation.
     */
    protected function generateFitExplanation(float $interests, float $skills, float $personality): string
    {
        $explanations = [];

        if ($interests >= 75) {
            $explanations[] = 'Strong interest alignment';
        } elseif ($interests >= 60) {
            $explanations[] = 'Good interest match';
        } else {
            $explanations[] = 'Moderate interest fit';
        }

        if ($skills >= 75) {
            $explanations[] = 'high skill readiness';
        } elseif ($skills >= 60) {
            $explanations[] = 'adequate skills';
        } else {
            $explanations[] = 'skills development needed';
        }

        if ($personality >= 70) {
            $explanations[] = 'excellent personality fit';
        } elseif ($personality >= 55) {
            $explanations[] = 'compatible personality';
        }

        return implode(', ', $explanations).'.';
    }

    /**
     * Estimate learning path timeframe.
     */
    protected function estimateTimeframe(array $gaps): string
    {
        $totalGap = collect($gaps)->sum('gap');
        $months = ceil($totalGap / 10); // Rough estimation

        return match (true) {
            $months <= 6 => '6 months or less',
            $months <= 12 => '6-12 months',
            $months <= 18 => '12-18 months',
            default => '18+ months',
        };
    }

    /**
     * Suggest learning resources for a skill.
     */
    protected function suggestResources(string $skill): array
    {
        // This would integrate with Course/Resource models in production
        return [
            'type' => 'Online Courses',
            'recommendations' => [
                "Coursera: {$skill} Specialization",
                "LinkedIn Learning: {$skill} Path",
                "Udemy: Master {$skill}",
            ],
        ];
    }

    /**
     * Get latest completed attempt for a user and assessment type.
     */
    protected function getLatestCompletedAttempt(User $user, string $assessmentSlug): ?UserAssessmentAttempt
    {
        return UserAssessmentAttempt::whereHas('assessmentType', function ($q) use ($assessmentSlug) {
            $q->where('slug', $assessmentSlug);
        })
            ->where('user_id', $user->id)
            ->whereNotNull('completed_at')
            ->latest('completed_at')
            ->first();
    }

    /**
     * Check if user has completed all required assessments.
     */
    public function hasCompletedAllAssessments(User $user): bool
    {
        $required = ['riasec', 'skills', 'personality'];

        foreach ($required as $slug) {
            if (! $this->getLatestCompletedAttempt($user, $slug)) {
                return false;
            }
        }

        return true;
    }
}
