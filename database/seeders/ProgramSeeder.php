<?php

namespace Database\Seeders;

use App\Models\Program;
use App\Models\University;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            // STEM Programs
            ['name' => 'Computer Science', 'category' => 'STEM', 'description' => 'Study of computation, algorithms, and software development'],
            ['name' => 'Engineering', 'category' => 'STEM', 'description' => 'Design and development of systems and structures'],
            ['name' => 'Mechanical Engineering', 'category' => 'STEM', 'description' => 'Design and manufacture of mechanical systems'],
            ['name' => 'Electrical Engineering', 'category' => 'STEM', 'description' => 'Study of electrical systems and electronics'],
            ['name' => 'Civil Engineering', 'category' => 'STEM', 'description' => 'Infrastructure design and construction'],
            ['name' => 'Biology', 'category' => 'STEM', 'description' => 'Study of living organisms'],
            ['name' => 'Chemistry', 'category' => 'STEM', 'description' => 'Study of matter and chemical reactions'],
            ['name' => 'Physics', 'category' => 'STEM', 'description' => 'Study of matter, energy, and their interactions'],
            ['name' => 'Mathematics', 'category' => 'STEM', 'description' => 'Study of numbers, patterns, and structures'],
            ['name' => 'Data Science', 'category' => 'STEM', 'description' => 'Analysis and interpretation of complex data'],

            // Business Programs
            ['name' => 'Business Administration', 'category' => 'Business', 'description' => 'Management and operations of organizations'],
            ['name' => 'Accounting', 'category' => 'Business', 'description' => 'Financial record keeping and analysis'],
            ['name' => 'Finance', 'category' => 'Business', 'description' => 'Money management and investment strategies'],
            ['name' => 'Marketing', 'category' => 'Business', 'description' => 'Promotion and sale of products or services'],
            ['name' => 'Economics', 'category' => 'Business', 'description' => 'Study of production and distribution of resources'],
            ['name' => 'Entrepreneurship', 'category' => 'Business', 'description' => 'Starting and managing new business ventures'],

            // Liberal Arts
            ['name' => 'English', 'category' => 'Liberal Arts', 'description' => 'Literature, writing, and language studies'],
            ['name' => 'History', 'category' => 'Liberal Arts', 'description' => 'Study of past events and civilizations'],
            ['name' => 'Political Science', 'category' => 'Liberal Arts', 'description' => 'Study of government and politics'],
            ['name' => 'Psychology', 'category' => 'Liberal Arts', 'description' => 'Study of human mind and behavior'],
            ['name' => 'Sociology', 'category' => 'Liberal Arts', 'description' => 'Study of human society and social relationships'],
            ['name' => 'Philosophy', 'category' => 'Liberal Arts', 'description' => 'Study of fundamental questions about existence'],

            // Health Sciences
            ['name' => 'Nursing', 'category' => 'Health Sciences', 'description' => 'Healthcare and patient care'],
            ['name' => 'Pre-Medicine', 'category' => 'Health Sciences', 'description' => 'Preparation for medical school'],
            ['name' => 'Public Health', 'category' => 'Health Sciences', 'description' => 'Community health and disease prevention'],
            ['name' => 'Pharmacy', 'category' => 'Health Sciences', 'description' => 'Medication and pharmaceutical care'],

            // Arts & Humanities
            ['name' => 'Art', 'category' => 'Arts & Humanities', 'description' => 'Visual arts and creative expression'],
            ['name' => 'Music', 'category' => 'Arts & Humanities', 'description' => 'Musical performance and theory'],
            ['name' => 'Theater', 'category' => 'Arts & Humanities', 'description' => 'Dramatic arts and performance'],
            ['name' => 'Communications', 'category' => 'Arts & Humanities', 'description' => 'Media and information exchange'],

            // Other
            ['name' => 'Education', 'category' => 'Education', 'description' => 'Teaching and learning methodologies'],
            ['name' => 'Law', 'category' => 'Law', 'description' => 'Legal systems and jurisprudence'],
            ['name' => 'Architecture', 'category' => 'Design', 'description' => 'Building and structural design'],
            ['name' => 'Environmental Science', 'category' => 'STEM', 'description' => 'Study of the environment and sustainability'],
        ];

        foreach ($programs as $program) {
            Program::create([
                'name' => $program['name'],
                'slug' => Str::slug($program['name']),
                'category' => $program['category'],
                'description' => $program['description'],
            ]);
        }

        // Attach random programs to universities with a random college/school label
        $allPrograms = Program::all();
        $colleges = [
            'School of Engineering',
            'College of Arts & Sciences',
            'School of Business',
            'School of Health Sciences',
            'School of Education',
            'School of Architecture',
        ];
        $degrees = ['BSc', 'BA', 'BEng', 'MSc', 'MBA', 'PhD'];

        University::all()->each(function ($university) use ($allPrograms, $colleges, $degrees) {
            $pick = $allPrograms->random(rand(5, 15));
            $attachData = [];
            foreach ($pick as $program) {
                $attachData[$program->id] = [
                    'college' => $colleges[array_rand($colleges)],
                    'degree' => $degrees[array_rand($degrees)],
                ];
            }
            $university->programsRelation()->attach($attachData);
        });
    }
}
