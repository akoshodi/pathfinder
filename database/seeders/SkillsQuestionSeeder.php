<?php

namespace Database\Seeders;

use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use Illuminate\Database\Seeder;

class SkillsQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skillsType = AssessmentType::where('slug', 'skills')->first();

        if (! $skillsType) {
            $this->command->warn('Skills assessment type not found. Run AssessmentTypeSeeder first.');

            return;
        }

        $questions = $this->getQuestions();

        foreach ($questions as $index => $questionData) {
            // Ensure valid question_type for current schema
            $questionData['question_type'] = 'skill_rating';

            AssessmentQuestion::updateOrCreate(
                [
                    'assessment_type_id' => $skillsType->id,
                    'order' => $index + 1,
                ],
                $questionData
            );
        }

        $this->command->info('Created '.count($questions).' Skills Assessment questions.');
    }

    protected function getQuestions(): array
    {
        return [
            // Cognitive Skills - 10 questions
            [
                'question_text' => 'I can analyze complex problems and break them down into manageable parts',
                'question_type' => 'self_rating',
                'category' => 'Cognitive',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can identify patterns and trends in data or information',
                'question_type' => 'self_rating',
                'category' => 'Cognitive',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can make sound decisions based on available information',
                'question_type' => 'self_rating',
                'category' => 'Cognitive',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can think critically and evaluate arguments objectively',
                'question_type' => 'self_rating',
                'category' => 'Cognitive',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can develop strategic plans to achieve long-term goals',
                'question_type' => 'self_rating',
                'category' => 'Cognitive',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can synthesize information from multiple sources',
                'question_type' => 'self_rating',
                'category' => 'Cognitive',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can apply logical reasoning to solve problems',
                'question_type' => 'self_rating',
                'category' => 'Cognitive',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can quickly grasp new concepts and ideas',
                'question_type' => 'self_rating',
                'category' => 'Cognitive',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can evaluate risks and make informed decisions',
                'question_type' => 'self_rating',
                'category' => 'Cognitive',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can remember and recall detailed information accurately',
                'question_type' => 'self_rating',
                'category' => 'Cognitive',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],

            // Technical Skills - 10 questions
            [
                'question_text' => 'I am proficient with common office software (Word, Excel, PowerPoint)',
                'question_type' => 'self_rating',
                'category' => 'Technical',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can learn and adapt to new software and technology quickly',
                'question_type' => 'self_rating',
                'category' => 'Technical',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can troubleshoot basic technical problems independently',
                'question_type' => 'self_rating',
                'category' => 'Technical',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can work with data analysis tools and spreadsheets effectively',
                'question_type' => 'self_rating',
                'category' => 'Technical',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I understand digital security and best practices for online safety',
                'question_type' => 'self_rating',
                'category' => 'Technical',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can use project management or collaboration tools effectively',
                'question_type' => 'self_rating',
                'category' => 'Technical',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can create and edit digital content (documents, presentations, graphics)',
                'question_type' => 'self_rating',
                'category' => 'Technical',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can manage and organize digital files and information efficiently',
                'question_type' => 'self_rating',
                'category' => 'Technical',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can conduct effective online research and evaluate sources',
                'question_type' => 'self_rating',
                'category' => 'Technical',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can use communication platforms (email, video conferencing) professionally',
                'question_type' => 'self_rating',
                'category' => 'Technical',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],

            // Social Skills - 10 questions
            [
                'question_text' => 'I can communicate clearly and effectively in writing',
                'question_type' => 'self_rating',
                'category' => 'Social',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can present ideas and information confidently to groups',
                'question_type' => 'self_rating',
                'category' => 'Social',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I practice active listening and understand others\' perspectives',
                'question_type' => 'self_rating',
                'category' => 'Social',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I work effectively in teams and collaborate well with others',
                'question_type' => 'self_rating',
                'category' => 'Social',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can resolve conflicts diplomatically and constructively',
                'question_type' => 'self_rating',
                'category' => 'Social',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can empathize with others and understand their emotions',
                'question_type' => 'self_rating',
                'category' => 'Social',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can build and maintain professional relationships',
                'question_type' => 'self_rating',
                'category' => 'Social',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can give and receive constructive feedback appropriately',
                'question_type' => 'self_rating',
                'category' => 'Social',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can adapt my communication style to different audiences',
                'question_type' => 'self_rating',
                'category' => 'Social',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can network effectively and build professional connections',
                'question_type' => 'self_rating',
                'category' => 'Social',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],

            // Management Skills - 10 questions
            [
                'question_text' => 'I can lead and motivate teams to achieve goals',
                'question_type' => 'self_rating',
                'category' => 'Management',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can manage my time effectively and prioritize tasks',
                'question_type' => 'self_rating',
                'category' => 'Management',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can plan and execute projects from start to finish',
                'question_type' => 'self_rating',
                'category' => 'Management',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can delegate tasks appropriately and trust others',
                'question_type' => 'self_rating',
                'category' => 'Management',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can manage budgets and resources efficiently',
                'question_type' => 'self_rating',
                'category' => 'Management',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can make decisions under pressure and uncertainty',
                'question_type' => 'self_rating',
                'category' => 'Management',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can monitor progress and adjust plans as needed',
                'question_type' => 'self_rating',
                'category' => 'Management',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can coach and develop others\' skills',
                'question_type' => 'self_rating',
                'category' => 'Management',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can set clear goals and expectations for teams',
                'question_type' => 'self_rating',
                'category' => 'Management',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can handle multiple responsibilities simultaneously',
                'question_type' => 'self_rating',
                'category' => 'Management',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
                ],
                'scoring_map' => [
                    1 => ['score' => 1],
                    2 => ['score' => 2],
                    3 => ['score' => 3],
                    4 => ['score' => 4],
                    5 => ['score' => 5],
                ],
            ],

            // Creative Skills - 10 questions
            [
                'question_text' => 'I can generate original and innovative ideas',
                'question_type' => 'self_rating',
                'category' => 'Creative',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can think outside the box and challenge conventions',
                'question_type' => 'self_rating',
                'category' => 'Creative',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can use design thinking to solve problems creatively',
                'question_type' => 'self_rating',
                'category' => 'Creative',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can brainstorm and facilitate creative sessions',
                'question_type' => 'self_rating',
                'category' => 'Creative',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can visualize and create compelling designs or concepts',
                'question_type' => 'self_rating',
                'category' => 'Creative',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can adapt and improvise when plans change',
                'question_type' => 'self_rating',
                'category' => 'Creative',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can combine different ideas to create something new',
                'question_type' => 'self_rating',
                'category' => 'Creative',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can express ideas through various creative mediums',
                'question_type' => 'self_rating',
                'category' => 'Creative',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can experiment with new approaches without fear of failure',
                'question_type' => 'self_rating',
                'category' => 'Creative',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
                'question_text' => 'I can inspire creativity and innovation in others',
                'question_type' => 'self_rating',
                'category' => 'Creative',
                'options' => [
                    ['value' => 1, 'label' => 'Novice - I struggle with this'],
                    ['value' => 2, 'label' => 'Beginner - I have basic ability'],
                    ['value' => 3, 'label' => 'Intermediate - I am competent'],
                    ['value' => 4, 'label' => 'Advanced - I am proficient'],
                    ['value' => 5, 'label' => 'Expert - I excel at this'],
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
