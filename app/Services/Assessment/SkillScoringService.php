<?php

namespace App\Services\Assessment;

use App\Models\SkillProficiency;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;

class SkillScoringService
{
    /**
     * Skill domains and their weights
     */
    protected array $domains = [
        'Cognitive' => ['weight' => 1.0],
        'Technical' => ['weight' => 1.0],
        'Social' => ['weight' => 1.0],
        'Management' => ['weight' => 1.0],
        'Creative' => ['weight' => 1.0],
    ];

    /**
     * Calculate skill proficiency scores from assessment responses
     */
    public function calculateScores(UserAssessmentAttempt $attempt): void
    {
        $responses = UserAssessmentResponse::where('attempt_id', $attempt->id)
            ->with('question')
            ->get();

        $domainScores = [];

        // Group responses by domain
        foreach ($responses as $response) {
            $question = $response->question;
            $domain = $question->category; // Category represents skill domain

            if (! isset($domainScores[$domain])) {
                $domainScores[$domain] = [
                    'total_score' => 0,
                    'max_score' => 0,
                    'count' => 0,
                ];
            }

            // Each question is rated 1-5, where 5 is expert level
            $responseValue = $response->response_value;
            $domainScores[$domain]['total_score'] += $responseValue;
            $domainScores[$domain]['max_score'] += 5; // Max rating
            $domainScores[$domain]['count']++;
        }

        // Create SkillProficiency records for each domain
        foreach ($domainScores as $domain => $scores) {
            if ($scores['count'] === 0) {
                continue;
            }

            $avgScore = $scores['total_score'] / $scores['count']; // 1-5 scale
            $percentage = ($avgScore / 5) * 100; // 0-100%

            SkillProficiency::create([
                'attempt_id' => $attempt->id,
                'skill_domain' => $domain,
                'skill_name' => $this->getDomainSkillName($domain),
                'proficiency_level' => (int) round($avgScore), // store as 1-5 level
                'max_level' => 5,
                'proficiency_label' => $this->getProficiencyLevel($percentage),
            ]);
        }

        // Update attempt with raw and normalized scores
        $attempt->update([
            'raw_scores' => $domainScores,
            'normalized_scores' => array_map(function ($scores) {
                $avg = $scores['count'] > 0 ? $scores['total_score'] / $scores['count'] : 0;

                return round(($avg / 5) * 100, 2);
            }, $domainScores),
        ]);
    }

    /**
     * Get skill name for domain
     */
    protected function getDomainSkillName(string $domain): string
    {
        $names = [
            'Cognitive' => 'Analytical Thinking & Problem Solving',
            'Technical' => 'Technical & Digital Competency',
            'Social' => 'Interpersonal & Communication',
            'Management' => 'Leadership & Project Management',
            'Creative' => 'Innovation & Creative Thinking',
        ];

        return $names[$domain] ?? $domain;
    }

    /**
     * Get domain descriptions
     */
    public function getDomainDescriptions(): array
    {
        return [
            'Cognitive' => [
                'name' => 'Cognitive Skills',
                'description' => 'Analytical thinking, problem-solving, critical reasoning, and decision-making abilities.',
                'skills' => [
                    'Critical thinking',
                    'Problem solving',
                    'Data analysis',
                    'Logical reasoning',
                    'Strategic planning',
                ],
            ],
            'Technical' => [
                'name' => 'Technical Skills',
                'description' => 'Proficiency with tools, technologies, software, and technical processes.',
                'skills' => [
                    'Software proficiency',
                    'Technical tools',
                    'Programming',
                    'Data management',
                    'Digital literacy',
                ],
            ],
            'Social' => [
                'name' => 'Social Skills',
                'description' => 'Communication, collaboration, empathy, and relationship-building capabilities.',
                'skills' => [
                    'Communication',
                    'Teamwork',
                    'Active listening',
                    'Empathy',
                    'Conflict resolution',
                ],
            ],
            'Management' => [
                'name' => 'Management Skills',
                'description' => 'Leadership, organization, project management, and team coordination abilities.',
                'skills' => [
                    'Leadership',
                    'Project management',
                    'Time management',
                    'Delegation',
                    'Performance management',
                ],
            ],
            'Creative' => [
                'name' => 'Creative Skills',
                'description' => 'Innovation, creative thinking, design, and generating novel solutions.',
                'skills' => [
                    'Creative thinking',
                    'Innovation',
                    'Design thinking',
                    'Brainstorming',
                    'Artistic expression',
                ],
            ],
        ];
    }

    /**
     * Get proficiency level label
     */
    public function getProficiencyLevel(float $score): string
    {
        if ($score >= 90) {
            return 'Expert';
        }
        if ($score >= 75) {
            return 'Advanced';
        }
        if ($score >= 60) {
            return 'Proficient';
        }
        if ($score >= 40) {
            return 'Intermediate';
        }

        return 'Novice';
    }

    /**
     * Generate skill development recommendations
     */
    public function generateRecommendations(UserAssessmentAttempt $attempt): array
    {
        $proficiencies = $attempt->skillProficiencies;
        $recommendations = [];

        foreach ($proficiencies as $proficiency) {
            if ($proficiency->needsImprovement()) {
                $percent = $proficiency->getProficiencyPercentage();
                $recommendations[] = [
                    'domain' => $proficiency->skill_domain,
                    'skill_name' => $proficiency->skill_name,
                    'current_level' => $this->getProficiencyLevel($percent),
                    'suggestion' => "Focus on developing your {$proficiency->skill_domain} skills to advance your career opportunities.",
                    'actions' => $this->getImprovementActions($proficiency->skill_domain),
                ];
            }
        }

        return $recommendations;
    }

    /**
     * Get improvement actions for domain
     */
    protected function getImprovementActions(string $domain): array
    {
        $actions = [
            'Cognitive' => [
                'Take online courses in critical thinking and logic',
                'Practice solving complex problems regularly',
                'Engage in analytical exercises and puzzles',
            ],
            'Technical' => [
                'Learn industry-relevant software and tools',
                'Complete technical certifications',
                'Build hands-on projects',
            ],
            'Social' => [
                'Join networking groups and events',
                'Practice active listening',
                'Volunteer for team projects',
            ],
            'Management' => [
                'Take leadership training courses',
                'Lead small projects or teams',
                'Learn project management methodologies',
            ],
            'Creative' => [
                'Engage in creative hobbies',
                'Participate in innovation workshops',
                'Practice brainstorming techniques',
            ],
        ];

        return $actions[$domain] ?? [];
    }
}
