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

        // Seed sample content for public pages if empty
        $this->call(SampleContentSeeder::class);

        // Seed link aggregator content
        $this->call(LinkSeeder::class);

        // Seed assessments (types and questions)
        $this->call([
            AssessmentTypeSeeder::class,
            RiasecQuestionSeeder::class,
            SkillsQuestionSeeder::class,
            PersonalityQuestionSeeder::class,
        ]);
    }
}
