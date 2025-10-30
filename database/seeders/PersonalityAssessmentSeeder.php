<?php

namespace Database\Seeders;

use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use Illuminate\Database\Seeder;

class PersonalityAssessmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $personalityAssessment = AssessmentType::where('slug', 'personality')->first();

        if (! $personalityAssessment) {
            $this->command?->warn('Personality assessment type not found. Run AssessmentTypeSeeder first.');

            return;
        }

        // Clear existing questions
        AssessmentQuestion::where('assessment_type_id', $personalityAssessment->id)->delete();

        $questions = [
            // Openness (10 questions)
            [
                'category' => 'Openness',
                'question_text' => 'I am curious about many different things.',
                'order' => 1,
            ],
            [
                'category' => 'Openness',
                'question_text' => 'I enjoy exploring new ideas and concepts.',
                'order' => 2,
            ],
            [
                'category' => 'Openness',
                'question_text' => 'I appreciate art, music, and cultural experiences.',
                'order' => 3,
            ],
            [
                'category' => 'Openness',
                'question_text' => 'I like to think about abstract or philosophical questions.',
                'order' => 4,
            ],
            [
                'category' => 'Openness',
                'question_text' => 'I am imaginative and creative in my thinking.',
                'order' => 5,
            ],
            [
                'category' => 'Openness',
                'question_text' => 'I enjoy trying new activities and experiences.',
                'order' => 6,
            ],
            [
                'category' => 'Openness',
                'question_text' => 'I am intellectually curious and enjoy learning.',
                'order' => 7,
            ],
            [
                'category' => 'Openness',
                'question_text' => 'I prefer variety and change over routine and predictability.',
                'order' => 8,
            ],
            [
                'category' => 'Openness',
                'question_text' => 'I am open to unconventional ideas and viewpoints.',
                'order' => 9,
            ],
            [
                'category' => 'Openness',
                'question_text' => 'I have a vivid imagination.',
                'order' => 10,
            ],

            // Conscientiousness (10 questions)
            [
                'category' => 'Conscientiousness',
                'question_text' => 'I am reliable and can be counted on to follow through.',
                'order' => 11,
            ],
            [
                'category' => 'Conscientiousness',
                'question_text' => 'I like to keep things organized and tidy.',
                'order' => 12,
            ],
            [
                'category' => 'Conscientiousness',
                'question_text' => 'I work diligently to achieve my goals.',
                'order' => 13,
            ],
            [
                'category' => 'Conscientiousness',
                'question_text' => 'I plan ahead and think about the consequences of my actions.',
                'order' => 14,
            ],
            [
                'category' => 'Conscientiousness',
                'question_text' => 'I pay attention to details and strive for accuracy.',
                'order' => 15,
            ],
            [
                'category' => 'Conscientiousness',
                'question_text' => 'I am self-disciplined and able to resist temptations.',
                'order' => 16,
            ],
            [
                'category' => 'Conscientiousness',
                'question_text' => 'I complete tasks thoroughly before moving on.',
                'order' => 17,
            ],
            [
                'category' => 'Conscientiousness',
                'question_text' => 'I am punctual and manage my time well.',
                'order' => 18,
            ],
            [
                'category' => 'Conscientiousness',
                'question_text' => 'I am ambitious and work hard to succeed.',
                'order' => 19,
            ],
            [
                'category' => 'Conscientiousness',
                'question_text' => 'I take my responsibilities seriously.',
                'order' => 20,
            ],

            // Extraversion (10 questions)
            [
                'category' => 'Extraversion',
                'question_text' => 'I enjoy being around people and socializing.',
                'order' => 21,
            ],
            [
                'category' => 'Extraversion',
                'question_text' => 'I am energized by social interactions.',
                'order' => 22,
            ],
            [
                'category' => 'Extraversion',
                'question_text' => 'I like to be the center of attention.',
                'order' => 23,
            ],
            [
                'category' => 'Extraversion',
                'question_text' => 'I am talkative and express my thoughts freely.',
                'order' => 24,
            ],
            [
                'category' => 'Extraversion',
                'question_text' => 'I enjoy lively, action-packed environments.',
                'order' => 25,
            ],
            [
                'category' => 'Extraversion',
                'question_text' => 'I am assertive and take charge in group situations.',
                'order' => 26,
            ],
            [
                'category' => 'Extraversion',
                'question_text' => 'I feel comfortable meeting new people.',
                'order' => 27,
            ],
            [
                'category' => 'Extraversion',
                'question_text' => 'I am enthusiastic and upbeat in my demeanor.',
                'order' => 28,
            ],
            [
                'category' => 'Extraversion',
                'question_text' => 'I prefer working with others over working alone.',
                'order' => 29,
            ],
            [
                'category' => 'Extraversion',
                'question_text' => 'I actively seek excitement and stimulation.',
                'order' => 30,
            ],

            // Agreeableness (10 questions)
            [
                'category' => 'Agreeableness',
                'question_text' => 'I am considerate and kind to others.',
                'order' => 31,
            ],
            [
                'category' => 'Agreeableness',
                'question_text' => 'I trust people and believe in their good intentions.',
                'order' => 32,
            ],
            [
                'category' => 'Agreeableness',
                'question_text' => 'I am cooperative and willing to compromise.',
                'order' => 33,
            ],
            [
                'category' => 'Agreeableness',
                'question_text' => 'I care about others\' feelings and well-being.',
                'order' => 34,
            ],
            [
                'category' => 'Agreeableness',
                'question_text' => 'I avoid conflicts and prefer harmony.',
                'order' => 35,
            ],
            [
                'category' => 'Agreeableness',
                'question_text' => 'I am generous and willing to help others.',
                'order' => 36,
            ],
            [
                'category' => 'Agreeableness',
                'question_text' => 'I am forgiving and hold no grudges.',
                'order' => 37,
            ],
            [
                'category' => 'Agreeableness',
                'question_text' => 'I value getting along with others.',
                'order' => 38,
            ],
            [
                'category' => 'Agreeableness',
                'question_text' => 'I am modest and humble about my achievements.',
                'order' => 39,
            ],
            [
                'category' => 'Agreeableness',
                'question_text' => 'I am sympathetic and compassionate toward others.',
                'order' => 40,
            ],

            // Emotional Stability (10 questions)
            [
                'category' => 'Emotional Stability',
                'question_text' => 'I remain calm in stressful situations.',
                'order' => 41,
            ],
            [
                'category' => 'Emotional Stability',
                'question_text' => 'I rarely feel anxious or worried.',
                'order' => 42,
            ],
            [
                'category' => 'Emotional Stability',
                'question_text' => 'I handle criticism well without getting upset.',
                'order' => 43,
            ],
            [
                'category' => 'Emotional Stability',
                'question_text' => 'I am even-tempered and don\'t get angry easily.',
                'order' => 44,
            ],
            [
                'category' => 'Emotional Stability',
                'question_text' => 'I am confident in my abilities.',
                'order' => 45,
            ],
            [
                'category' => 'Emotional Stability',
                'question_text' => 'I bounce back quickly from setbacks.',
                'order' => 46,
            ],
            [
                'category' => 'Emotional Stability',
                'question_text' => 'I don\'t let small things bother me.',
                'order' => 47,
            ],
            [
                'category' => 'Emotional Stability',
                'question_text' => 'I am emotionally stable and consistent.',
                'order' => 48,
            ],
            [
                'category' => 'Emotional Stability',
                'question_text' => 'I rarely feel depressed or down.',
                'order' => 49,
            ],
            [
                'category' => 'Emotional Stability',
                'question_text' => 'I handle pressure well without becoming overwhelmed.',
                'order' => 50,
            ],
        ];

        $options = [
            ['value' => 1, 'label' => 'Strongly Disagree'],
            ['value' => 2, 'label' => 'Disagree'],
            ['value' => 3, 'label' => 'Neutral'],
            ['value' => 4, 'label' => 'Agree'],
            ['value' => 5, 'label' => 'Strongly Agree'],
        ];

        foreach ($questions as $questionData) {
            AssessmentQuestion::create([
                'assessment_type_id' => $personalityAssessment->id,
                'question_text' => $questionData['question_text'],
                'question_type' => 'rating_scale',
                'options' => json_encode($options),
                'min_value' => 1,
                'max_value' => 5,
                'scale_label_min' => 'Strongly Disagree',
                'scale_label_max' => 'Strongly Agree',
                'category' => $questionData['category'],
                'order' => $questionData['order'],
                'is_active' => true,
            ]);
        }

        $this->command?->info('Personality assessment questions seeded successfully.');
    }
}
