<?php

namespace App\Services\Assessment;

use App\Models\PersonalityTrait;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;

class PersonalityScoringService
{
    /**
     * Big Five personality traits
     */
    protected array $traits = [
        'Openness',
        'Conscientiousness',
        'Extraversion',
        'Agreeableness',
        'Emotional Stability',
    ];

    /**
     * Calculate personality trait scores from assessment responses
     */
    public function calculateScores(UserAssessmentAttempt $attempt): void
    {
        $responses = UserAssessmentResponse::where('attempt_id', $attempt->id)
            ->with('question')
            ->get();

        $traitScores = [];

        // Group responses by trait (category)
        foreach ($responses as $response) {
            $question = $response->question;
            $trait = $question->category; // Category represents personality trait

            if (! isset($traitScores[$trait])) {
                $traitScores[$trait] = [
                    'total_score' => 0,
                    'count' => 0,
                ];
            }

            // Response value is 1-5 Likert scale
            // Some questions may be reverse-scored (check scoring_map)
            $score = $response->response_score ?? ['score' => $response->response_value];
            $actualScore = is_array($score) ? ($score['score'] ?? $response->response_value) : $response->response_value;

            $traitScores[$trait]['total_score'] += $actualScore;
            $traitScores[$trait]['count']++;
        }

        // Calculate average scores for each trait
        $averageScores = [];
        foreach ($traitScores as $trait => $scores) {
            if ($scores['count'] > 0) {
                // Convert 1-5 average to percentage (0-100)
                $avg = $scores['total_score'] / $scores['count'];
                $averageScores[$trait] = (int) round(($avg / 5) * 100);
            }
        }

        // Create PersonalityTrait record
        PersonalityTrait::create([
            'attempt_id' => $attempt->id,
            'openness_score' => $averageScores['Openness'] ?? 0,
            'conscientiousness_score' => $averageScores['Conscientiousness'] ?? 0,
            'extraversion_score' => $averageScores['Extraversion'] ?? 0,
            'agreeableness_score' => $averageScores['Agreeableness'] ?? 0,
            'emotional_stability_score' => $averageScores['Emotional Stability'] ?? 0,
            'mbti_type' => null, // Reserved for future MBTI mapping
            'work_style_preferences' => $this->determineWorkStylePreferences($averageScores),
        ]);

        // Update attempt with scores
        $attempt->update([
            'raw_scores' => $traitScores,
            'normalized_scores' => $averageScores,
        ]);
    }

    /**
     * Determine overall personality type based on dominant traits
     */
    protected function determinePersonalityType(array $scores): string
    {
        $dominant = [];

        foreach ($scores as $trait => $score) {
            if ($score >= 4.0) {
                $dominant[] = $this->getTraitShorthand($trait);
            }
        }

        if (empty($dominant)) {
            return 'Balanced';
        }

        return implode('-', $dominant);
    }

    /**
     * Get shorthand for trait
     */
    protected function getTraitShorthand(string $trait): string
    {
        $shorthands = [
            'Openness' => 'O',
            'Conscientiousness' => 'C',
            'Extraversion' => 'E',
            'Agreeableness' => 'A',
            'Emotional Stability' => 'S',
        ];

        return $shorthands[$trait] ?? substr($trait, 0, 1);
    }

    /**
     * Determine work style preferences
     */
    protected function determineWorkStylePreferences(array $scores): array
    {
        $preferences = [];

        // Openness: Innovation vs. Tradition
        if (($scores['Openness'] ?? 0) >= 4.0) {
            $preferences[] = 'Innovative and creative work';
            $preferences[] = 'Variety and new experiences';
        } else {
            $preferences[] = 'Structured and predictable work';
            $preferences[] = 'Established methods and routines';
        }

        // Conscientiousness: Organization
        if (($scores['Conscientiousness'] ?? 0) >= 4.0) {
            $preferences[] = 'Organized and detail-oriented tasks';
            $preferences[] = 'Planning and goal-setting';
        } else {
            $preferences[] = 'Flexible and spontaneous approach';
            $preferences[] = 'Adaptable work environment';
        }

        // Extraversion: Social interaction
        if (($scores['Extraversion'] ?? 0) >= 4.0) {
            $preferences[] = 'Collaborative team environments';
            $preferences[] = 'Frequent social interaction';
        } else {
            $preferences[] = 'Independent work';
            $preferences[] = 'Quiet, focused environments';
        }

        // Agreeableness: Cooperation
        if (($scores['Agreeableness'] ?? 0) >= 4.0) {
            $preferences[] = 'Cooperative and supportive teams';
            $preferences[] = 'Helping and mentoring others';
        } else {
            $preferences[] = 'Competitive environments';
            $preferences[] = 'Direct and assertive communication';
        }

        // Emotional Stability: Stress handling
        if (($scores['Emotional Stability'] ?? 0) >= 4.0) {
            $preferences[] = 'High-pressure situations';
            $preferences[] = 'Fast-paced environments';
        } else {
            $preferences[] = 'Stable and predictable pace';
            $preferences[] = 'Low-stress work settings';
        }

        return $preferences;
    }

    /**
     * Get trait descriptions
     */
    public function getTraitDescriptions(): array
    {
        return [
            'Openness' => [
                'name' => 'Openness to Experience',
                'description' => 'Reflects imagination, creativity, curiosity, and willingness to try new things.',
                'high_characteristics' => [
                    'Imaginative and creative',
                    'Curious about new ideas',
                    'Enjoys variety and change',
                    'Appreciates art and beauty',
                ],
                'low_characteristics' => [
                    'Practical and conventional',
                    'Prefers routine and familiarity',
                    'Down-to-earth',
                    'Traditional in approach',
                ],
            ],
            'Conscientiousness' => [
                'name' => 'Conscientiousness',
                'description' => 'Measures organization, dependability, self-discipline, and goal-orientation.',
                'high_characteristics' => [
                    'Organized and methodical',
                    'Reliable and dependable',
                    'Goal-oriented',
                    'Self-disciplined',
                ],
                'low_characteristics' => [
                    'Spontaneous and flexible',
                    'Easy-going',
                    'Adaptable',
                    'Less focused on planning',
                ],
            ],
            'Extraversion' => [
                'name' => 'Extraversion',
                'description' => 'Reflects sociability, assertiveness, energy level, and positive emotions.',
                'high_characteristics' => [
                    'Outgoing and sociable',
                    'Energetic and assertive',
                    'Enjoys being center of attention',
                    'Talkative',
                ],
                'low_characteristics' => [
                    'Reserved and quiet',
                    'Prefers solitude',
                    'Reflective',
                    'Independent',
                ],
            ],
            'Agreeableness' => [
                'name' => 'Agreeableness',
                'description' => 'Indicates cooperation, compassion, trust, and tendency to be helpful.',
                'high_characteristics' => [
                    'Cooperative and compassionate',
                    'Trusting of others',
                    'Helpful and generous',
                    'Values harmony',
                ],
                'low_characteristics' => [
                    'Competitive and assertive',
                    'Skeptical',
                    'Direct communicator',
                    'Independent-minded',
                ],
            ],
            'Emotional Stability' => [
                'name' => 'Emotional Stability',
                'description' => 'Measures emotional resilience, stress tolerance, and tendency toward negative emotions.',
                'high_characteristics' => [
                    'Calm and emotionally stable',
                    'Resilient under stress',
                    'Confident',
                    'Even-tempered',
                ],
                'low_characteristics' => [
                    'Emotionally reactive',
                    'Sensitive to stress',
                    'Anxious or moody',
                    'Self-conscious',
                ],
            ],
        ];
    }

    /**
     * Generate career recommendations based on personality
     */
    public function generateCareerRecommendations(array $scores): array
    {
        $recommendations = [];

        // High Openness
        if (($scores['Openness'] ?? 0) >= 4.0) {
            $recommendations[] = [
                'category' => 'Creative Fields',
                'careers' => ['Designer', 'Writer', 'Artist', 'Marketing Specialist', 'Researcher'],
            ];
        }

        // High Conscientiousness
        if (($scores['Conscientiousness'] ?? 0) >= 4.0) {
            $recommendations[] = [
                'category' => 'Structured Roles',
                'careers' => ['Project Manager', 'Accountant', 'Engineer', 'Analyst', 'Administrator'],
            ];
        }

        // High Extraversion
        if (($scores['Extraversion'] ?? 0) >= 4.0) {
            $recommendations[] = [
                'category' => 'People-Oriented Roles',
                'careers' => ['Sales Representative', 'Teacher', 'Event Planner', 'Public Relations', 'Manager'],
            ];
        }

        // High Agreeableness
        if (($scores['Agreeableness'] ?? 0) >= 4.0) {
            $recommendations[] = [
                'category' => 'Helping Professions',
                'careers' => ['Counselor', 'Nurse', 'Social Worker', 'Customer Service', 'HR Specialist'],
            ];
        }

        // High Emotional Stability
        if (($scores['Emotional Stability'] ?? 0) >= 4.0) {
            $recommendations[] = [
                'category' => 'High-Pressure Roles',
                'careers' => ['Emergency Responder', 'Surgeon', 'Executive', 'Pilot', 'Stock Trader'],
            ];
        }

        return $recommendations;
    }

    /**
     * Get interpretation of score
     */
    public function getScoreInterpretation(string $trait, float $score): string
    {
        if ($score >= 4.5) {
            return "Very High {$trait}";
        }
        if ($score >= 4.0) {
            return "High {$trait}";
        }
        if ($score >= 3.0) {
            return "Moderate {$trait}";
        }
        if ($score >= 2.0) {
            return "Low {$trait}";
        }

        return "Very Low {$trait}";
    }
}
