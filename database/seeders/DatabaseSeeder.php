<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles and permissions first
        $this->call(RolesAndPermissionsSeeder::class);

        // User::factory(10)->create();

        $testUser = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // Assign student role to test user
        $testUser->assignRole('student');

        // Create admin user
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $adminUser->assignRole('super-admin');

        // Core content seeders
        $this->call([
            UniversitySeeder::class,
            CourseSeeder::class,
            CompanySeeder::class,
            ProgramSeeder::class,
            ResourceSeeder::class,
            LocationSeeder::class,
            AlumniAssociationSeeder::class,
            NotableAlumnusSeeder::class,
            BlogPostSeeder::class,
            SponsoredAdSeeder::class,
            CareerSeeder::class, // legacy careers kept for now
            SampleContentSeeder::class,
            LinkSeeder::class,
            LinkCommentSeeder::class,
            LinkVoteSeeder::class,
        ]);

        // O*NET occupations and related data
        $this->call(OnetDatabaseSeeder::class);

        // Assessments (types and questions)
        $this->call([
            AssessmentTypeSeeder::class,
            RiasecQuestionSeeder::class,
            SkillsAssessmentSeeder::class,
            PersonalityAssessmentSeeder::class,
        ]);

        // Local-only demo data: completed attempt with report
        if (app()->environment('local')) {
            $this->call(DemoAssessmentSeeder::class);
        }
    }
}
