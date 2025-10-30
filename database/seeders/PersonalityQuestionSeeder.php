<?php

namespace Database\Seeders;

use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use Illuminate\Database\Seeder;

class PersonalityQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $personalityType = AssessmentType::where('slug', 'personality')->first();

        if (! $personalityType) {
            $this->command->warn('Personality assessment type not found. Run AssessmentTypeSeeder first.');

            return;
        }

        $questions = $this->getQuestions();

        foreach ($questions as $index => $questionData) {
            // Ensure valid question_type for current schema
            $questionData['question_type'] = 'rating_scale';

            AssessmentQuestion::updateOrCreate(
                [
                    'assessment_type_id' => $personalityType->id,
                    'order' => $index + 1,
                ],
                $questionData
            );
        }

        $this->command->info('Created '.count($questions).' Personality Assessment questions.');
    }

    protected function getQuestions(): array
    {
        return [
            // Openness - 10 questions
            [
                'question_text' => 'I enjoy exploring new ideas and concepts',
                'question_type' => 'likert_scale',
                'category' => 'Openness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I appreciate art, music, and other creative expressions',
                'question_type' => 'likert_scale',
                'category' => 'Openness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I prefer routine and predictable situations',
                'question_type' => 'likert_scale',
                'category' => 'Openness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 5], // Reverse scored
                    2 => ['score' => 4],
                    3 => ['score' => 3],
                    4 => ['score' => 2],
                    5 => ['score' => 1],
                ],
            ],
            [
                'question_text' => 'I am curious about many different things',
                'question_type' => 'likert_scale',
                'category' => 'Openness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I have a vivid imagination',
                'question_type' => 'likert_scale',
                'category' => 'Openness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I enjoy trying new things and experiences',
                'question_type' => 'likert_scale',
                'category' => 'Openness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I value tradition and established ways of doing things',
                'question_type' => 'likert_scale',
                'category' => 'Openness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 5], // Reverse scored
                    2 => ['score' => 4],
                    3 => ['score' => 3],
                    4 => ['score' => 2],
                    5 => ['score' => 1],
                ],
            ],
            [
                'question_text' => 'I enjoy abstract or philosophical discussions',
                'question_type' => 'likert_scale',
                'category' => 'Openness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I seek out intellectually stimulating activities',
                'question_type' => 'likert_scale',
                'category' => 'Openness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I am interested in learning about different cultures',
                'question_type' => 'likert_scale',
                'category' => 'Openness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],

            // Conscientiousness - 10 questions
            [
                'question_text' => 'I am organized and like to keep things tidy',
                'question_type' => 'likert_scale',
                'category' => 'Conscientiousness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I always complete tasks on time',
                'question_type' => 'likert_scale',
                'category' => 'Conscientiousness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I often act spontaneously without much planning',
                'question_type' => 'likert_scale',
                'category' => 'Conscientiousness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 5], // Reverse scored
                    2 => ['score' => 4],
                    3 => ['score' => 3],
                    4 => ['score' => 2],
                    5 => ['score' => 1],
                ],
            ],
            [
                'question_text' => 'I pay attention to details and strive for accuracy',
                'question_type' => 'likert_scale',
                'category' => 'Conscientiousness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I set goals and work systematically to achieve them',
                'question_type' => 'likert_scale',
                'category' => 'Conscientiousness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I am reliable and others can depend on me',
                'question_type' => 'likert_scale',
                'category' => 'Conscientiousness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I sometimes neglect my responsibilities',
                'question_type' => 'likert_scale',
                'category' => 'Conscientiousness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 5], // Reverse scored
                    2 => ['score' => 4],
                    3 => ['score' => 3],
                    4 => ['score' => 2],
                    5 => ['score' => 1],
                ],
            ],
            [
                'question_text' => 'I think through decisions carefully before acting',
                'question_type' => 'likert_scale',
                'category' => 'Conscientiousness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I have strong self-discipline and can resist temptations',
                'question_type' => 'likert_scale',
                'category' => 'Conscientiousness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I follow through on my commitments',
                'question_type' => 'likert_scale',
                'category' => 'Conscientiousness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],

            // Extraversion - 10 questions
            [
                'question_text' => 'I feel energized when I am around other people',
                'question_type' => 'likert_scale',
                'category' => 'Extraversion',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I enjoy being the center of attention',
                'question_type' => 'likert_scale',
                'category' => 'Extraversion',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I prefer working alone rather than in groups',
                'question_type' => 'likert_scale',
                'category' => 'Extraversion',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 5], // Reverse scored
                    2 => ['score' => 4],
                    3 => ['score' => 3],
                    4 => ['score' => 2],
                    5 => ['score' => 1],
                ],
            ],
            [
                'question_text' => 'I am talkative and like to engage in conversations',
                'question_type' => 'likert_scale',
                'category' => 'Extraversion',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I often take the lead in social situations',
                'question_type' => 'likert_scale',
                'category' => 'Extraversion',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I am enthusiastic and full of energy',
                'question_type' => 'likert_scale',
                'category' => 'Extraversion',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I need quiet time to recharge after social activities',
                'question_type' => 'likert_scale',
                'category' => 'Extraversion',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 5], // Reverse scored
                    2 => ['score' => 4],
                    3 => ['score' => 3],
                    4 => ['score' => 2],
                    5 => ['score' => 1],
                ],
            ],
            [
                'question_text' => 'I prefer large social gatherings to small intimate groups',
                'question_type' => 'likert_scale',
                'category' => 'Extraversion',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I make friends easily',
                'question_type' => 'likert_scale',
                'category' => 'Extraversion',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I am assertive and express my opinions clearly',
                'question_type' => 'likert_scale',
                'category' => 'Extraversion',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],

            // Agreeableness - 10 questions
            [
                'question_text' => 'I am considerate of others\' feelings',
                'question_type' => 'likert_scale',
                'category' => 'Agreeableness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I trust others and believe they have good intentions',
                'question_type' => 'likert_scale',
                'category' => 'Agreeableness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I am competitive and like to win',
                'question_type' => 'likert_scale',
                'category' => 'Agreeableness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 5], // Reverse scored
                    2 => ['score' => 4],
                    3 => ['score' => 3],
                    4 => ['score' => 2],
                    5 => ['score' => 1],
                ],
            ],
            [
                'question_text' => 'I am helpful and enjoy assisting others',
                'question_type' => 'likert_scale',
                'category' => 'Agreeableness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I can be forgiving when someone wrongs me',
                'question_type' => 'likert_scale',
                'category' => 'Agreeableness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I work well with others and value cooperation',
                'question_type' => 'likert_scale',
                'category' => 'Agreeableness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I can be somewhat skeptical or suspicious of others',
                'question_type' => 'likert_scale',
                'category' => 'Agreeableness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 5], // Reverse scored
                    2 => ['score' => 4],
                    3 => ['score' => 3],
                    4 => ['score' => 2],
                    5 => ['score' => 1],
                ],
            ],
            [
                'question_text' => 'I am patient and slow to anger',
                'question_type' => 'likert_scale',
                'category' => 'Agreeableness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I show compassion toward those in need',
                'question_type' => 'likert_scale',
                'category' => 'Agreeableness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I am polite and courteous in interactions',
                'question_type' => 'likert_scale',
                'category' => 'Agreeableness',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],

            // Emotional Stability - 10 questions
            [
                'question_text' => 'I remain calm under pressure',
                'question_type' => 'likert_scale',
                'category' => 'Emotional Stability',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I handle stress well',
                'question_type' => 'likert_scale',
                'category' => 'Emotional Stability',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I worry frequently about things',
                'question_type' => 'likert_scale',
                'category' => 'Emotional Stability',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 5], // Reverse scored
                    2 => ['score' => 4],
                    3 => ['score' => 3],
                    4 => ['score' => 2],
                    5 => ['score' => 1],
                ],
            ],
            [
                'question_text' => 'I am emotionally stable and not easily upset',
                'question_type' => 'likert_scale',
                'category' => 'Emotional Stability',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I bounce back quickly from setbacks',
                'question_type' => 'likert_scale',
                'category' => 'Emotional Stability',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I am confident and self-assured',
                'question_type' => 'likert_scale',
                'category' => 'Emotional Stability',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'My mood changes frequently',
                'question_type' => 'likert_scale',
                'category' => 'Emotional Stability',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 5], // Reverse scored
                    2 => ['score' => 4],
                    3 => ['score' => 3],
                    4 => ['score' => 2],
                    5 => ['score' => 1],
                ],
            ],
            [
                'question_text' => 'I maintain a positive outlook even in difficult situations',
                'question_type' => 'likert_scale',
                'category' => 'Emotional Stability',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I can manage my emotions effectively',
                'question_type' => 'likert_scale',
                'category' => 'Emotional Stability',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
            [
                'question_text' => 'I feel secure and comfortable with myself',
                'question_type' => 'likert_scale',
                'category' => 'Emotional Stability',
                'options' => [
                    ['value' => 1, 'label' => 'Strongly Disagree'],
                    ['value' => 2, 'label' => 'Disagree'],
                    ['value' => 3, 'label' => 'Neutral'],
                    ['value' => 4, 'label' => 'Agree'],
                    ['value' => 5, 'label' => 'Strongly Agree'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],
        ];
    }
}
