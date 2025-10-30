<?php

namespace Database\Seeders;

use App\Models\AssessmentType;
use Illuminate\Database\Seeder;

class AssessmentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $assessmentTypes = [
            [
                'name' => 'RIASEC Career Interest Assessment',
                'slug' => 'riasec',
                'description' => 'Discover your career interests based on the Holland Codes (RIASEC). This assessment helps identify careers that align with your personality and work preferences.',
                'category' => 'career_interest',
                'question_count' => 60,
                'estimated_duration' => 15,
                'scoring_config' => [
                    'dimensions' => ['R', 'I', 'A', 'S', 'E', 'C'],
                    'max_score_per_dimension' => 100,
                    'passing_threshold' => null,
                    'top_codes_count' => 3,
                ],
                'instructions' => 'Answer each question based on your genuine interests and preferences. There are no right or wrong answers. Think about what you enjoy doing, not what you think you should enjoy.',
                'is_active' => true,
            ],
            [
                'name' => 'Skills Assessment',
                'slug' => 'skills',
                'description' => 'Evaluate your proficiency across five key skill domains: Cognitive, Technical, Social, Management, and Creative. Identify your strengths and areas for development.',
                'category' => 'skills',
                'question_count' => 50,
                'estimated_duration' => 20,
                'scoring_config' => [
                    'domains' => ['Cognitive', 'Technical', 'Social', 'Management', 'Creative'],
                    'proficiency_levels' => ['Novice', 'Intermediate', 'Proficient', 'Advanced', 'Expert'],
                    'strength_threshold' => 75,
                    'improvement_threshold' => 50,
                ],
                'instructions' => 'Rate your current skill level honestly. Consider your actual experience and accomplishments, not just your knowledge of a topic.',
                'is_active' => true,
            ],
            [
                'name' => 'Personality Assessment',
                'slug' => 'personality',
                'description' => 'Understand your personality traits using the Big Five framework. Learn how your openness, conscientiousness, extraversion, agreeableness, and emotional stability influence your work style.',
                'category' => 'personality',
                'question_count' => 50,
                'estimated_duration' => 15,
                'scoring_config' => [
                    'traits' => ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Emotional Stability'],
                    'scale' => [1, 5],
                    'interpretation_ranges' => [
                        'low' => [1, 2.5],
                        'medium' => [2.5, 3.5],
                        'high' => [3.5, 5],
                    ],
                ],
                'instructions' => 'Respond to each statement based on how you typically think, feel, and behave in work and social situations.',
                'is_active' => true,
            ],
            [
                'name' => 'Comprehensive Career Fit Analysis',
                'slug' => 'career-fit',
                'description' => 'Get a holistic career recommendation by combining your interests, skills, and personality traits. This assessment provides personalized career matches with detailed action plans.',
                'category' => 'career_fit',
                'question_count' => 0, // Composite assessment
                'estimated_duration' => 0, // Depends on sub-assessments
                'scoring_config' => [
                    'required_assessments' => ['riasec', 'skills', 'personality'],
                    'weighting' => [
                        'interests' => 0.4,
                        'skills' => 0.35,
                        'personality' => 0.25,
                    ],
                    'min_match_score' => 60,
                ],
                'instructions' => 'This comprehensive analysis combines results from your RIASEC, Skills, and Personality assessments to provide tailored career recommendations.',
                'is_active' => true,
            ],
        ];

        foreach ($assessmentTypes as $type) {
            AssessmentType::updateOrCreate(
                ['slug' => $type['slug']],
                $type
            );
        }
    }
}
