<?php

namespace Database\Seeders;

use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use Illuminate\Database\Seeder;

class SkillsAssessmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skillsAssessment = AssessmentType::where('slug', 'skills')->first();

        if (! $skillsAssessment) {
            $this->command?->warn('Skills assessment type not found. Run AssessmentTypeSeeder first.');

            return;
        }

        // Clear existing questions
        AssessmentQuestion::where('assessment_type_id', $skillsAssessment->id)->delete();

        $questions = [
            // Cognitive Skills (10 questions)
            [
                'category' => 'Cognitive',
                'question_text' => 'I can analyze complex problems and break them down into manageable components.',
                'order' => 1,
            ],
            [
                'category' => 'Cognitive',
                'question_text' => 'I excel at identifying patterns and connections in data or information.',
                'order' => 2,
            ],
            [
                'category' => 'Cognitive',
                'question_text' => 'I can make sound decisions quickly even with incomplete information.',
                'order' => 3,
            ],
            [
                'category' => 'Cognitive',
                'question_text' => 'I am skilled at strategic thinking and long-term planning.',
                'order' => 4,
            ],
            [
                'category' => 'Cognitive',
                'question_text' => 'I can easily understand and remember complex concepts.',
                'order' => 5,
            ],
            [
                'category' => 'Cognitive',
                'question_text' => 'I am proficient at evaluating information critically and objectively.',
                'order' => 6,
            ],
            [
                'category' => 'Cognitive',
                'question_text' => 'I can quickly learn new systems, processes, or methodologies.',
                'order' => 7,
            ],
            [
                'category' => 'Cognitive',
                'question_text' => 'I excel at logical reasoning and problem-solving.',
                'order' => 8,
            ],
            [
                'category' => 'Cognitive',
                'question_text' => 'I can synthesize information from multiple sources to form insights.',
                'order' => 9,
            ],
            [
                'category' => 'Cognitive',
                'question_text' => 'I am skilled at abstract thinking and conceptualization.',
                'order' => 10,
            ],

            // Technical Skills (10 questions)
            [
                'category' => 'Technical',
                'question_text' => 'I am proficient with industry-standard software and tools in my field.',
                'order' => 11,
            ],
            [
                'category' => 'Technical',
                'question_text' => 'I can troubleshoot technical issues effectively.',
                'order' => 12,
            ],
            [
                'category' => 'Technical',
                'question_text' => 'I have strong expertise in my specialized technical domain.',
                'order' => 13,
            ],
            [
                'category' => 'Technical',
                'question_text' => 'I can quickly adapt to new technologies and platforms.',
                'order' => 14,
            ],
            [
                'category' => 'Technical',
                'question_text' => 'I am skilled at using data analysis tools and techniques.',
                'order' => 15,
            ],
            [
                'category' => 'Technical',
                'question_text' => 'I can document technical processes clearly and comprehensively.',
                'order' => 16,
            ],
            [
                'category' => 'Technical',
                'question_text' => 'I am proficient at optimizing workflows and processes.',
                'order' => 17,
            ],
            [
                'category' => 'Technical',
                'question_text' => 'I have strong computer literacy and digital fluency.',
                'order' => 18,
            ],
            [
                'category' => 'Technical',
                'question_text' => 'I can conduct research and stay current with technical developments.',
                'order' => 19,
            ],
            [
                'category' => 'Technical',
                'question_text' => 'I am skilled at quality assurance and attention to detail.',
                'order' => 20,
            ],

            // Social Skills (10 questions)
            [
                'category' => 'Social',
                'question_text' => 'I communicate effectively with diverse audiences.',
                'order' => 21,
            ],
            [
                'category' => 'Social',
                'question_text' => 'I am skilled at building rapport and professional relationships.',
                'order' => 22,
            ],
            [
                'category' => 'Social',
                'question_text' => 'I can collaborate productively with team members.',
                'order' => 23,
            ],
            [
                'category' => 'Social',
                'question_text' => 'I am empathetic and understand others\' perspectives well.',
                'order' => 24,
            ],
            [
                'category' => 'Social',
                'question_text' => 'I excel at active listening and understanding stakeholder needs.',
                'order' => 25,
            ],
            [
                'category' => 'Social',
                'question_text' => 'I can resolve conflicts constructively and diplomatically.',
                'order' => 26,
            ],
            [
                'category' => 'Social',
                'question_text' => 'I am comfortable presenting ideas to groups.',
                'order' => 27,
            ],
            [
                'category' => 'Social',
                'question_text' => 'I can give and receive constructive feedback effectively.',
                'order' => 28,
            ],
            [
                'category' => 'Social',
                'question_text' => 'I am skilled at networking and building professional connections.',
                'order' => 29,
            ],
            [
                'category' => 'Social',
                'question_text' => 'I can adapt my communication style to different situations.',
                'order' => 30,
            ],

            // Management Skills (10 questions)
            [
                'category' => 'Management',
                'question_text' => 'I am effective at planning and organizing projects.',
                'order' => 31,
            ],
            [
                'category' => 'Management',
                'question_text' => 'I can prioritize tasks and manage time efficiently.',
                'order' => 32,
            ],
            [
                'category' => 'Management',
                'question_text' => 'I am skilled at delegating responsibilities appropriately.',
                'order' => 33,
            ],
            [
                'category' => 'Management',
                'question_text' => 'I can motivate and inspire team members.',
                'order' => 34,
            ],
            [
                'category' => 'Management',
                'question_text' => 'I excel at setting clear goals and expectations.',
                'order' => 35,
            ],
            [
                'category' => 'Management',
                'question_text' => 'I am proficient at monitoring progress and providing oversight.',
                'order' => 36,
            ],
            [
                'category' => 'Management',
                'question_text' => 'I can make difficult decisions when necessary.',
                'order' => 37,
            ],
            [
                'category' => 'Management',
                'question_text' => 'I am skilled at resource allocation and budgeting.',
                'order' => 38,
            ],
            [
                'category' => 'Management',
                'question_text' => 'I can identify and develop talent in others.',
                'order' => 39,
            ],
            [
                'category' => 'Management',
                'question_text' => 'I am effective at risk management and contingency planning.',
                'order' => 40,
            ],

            // Creative Skills (10 questions)
            [
                'category' => 'Creative',
                'question_text' => 'I can generate innovative ideas and solutions.',
                'order' => 41,
            ],
            [
                'category' => 'Creative',
                'question_text' => 'I am skilled at thinking outside conventional boundaries.',
                'order' => 42,
            ],
            [
                'category' => 'Creative',
                'question_text' => 'I can visualize and design effective solutions.',
                'order' => 43,
            ],
            [
                'category' => 'Creative',
                'question_text' => 'I excel at brainstorming and ideation sessions.',
                'order' => 44,
            ],
            [
                'category' => 'Creative',
                'question_text' => 'I am comfortable with ambiguity and experimentation.',
                'order' => 45,
            ],
            [
                'category' => 'Creative',
                'question_text' => 'I can transform abstract concepts into practical applications.',
                'order' => 46,
            ],
            [
                'category' => 'Creative',
                'question_text' => 'I am skilled at storytelling and narrative development.',
                'order' => 47,
            ],
            [
                'category' => 'Creative',
                'question_text' => 'I can see connections others might miss.',
                'order' => 48,
            ],
            [
                'category' => 'Creative',
                'question_text' => 'I am proficient at design thinking and user-centered approaches.',
                'order' => 49,
            ],
            [
                'category' => 'Creative',
                'question_text' => 'I can adapt and pivot strategies when circumstances change.',
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
                'assessment_type_id' => $skillsAssessment->id,
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

        $this->command?->info('Skills assessment questions seeded successfully.');
    }
}
