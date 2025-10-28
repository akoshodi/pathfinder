<?php

namespace Database\Seeders;

use App\Models\AlumniAssociation;
use App\Models\BlogPost;
use App\Models\Career;
use App\Models\Company;
use App\Models\Competition;
use App\Models\Course;
use App\Models\Location;
use App\Models\MarketplaceItem;
use App\Models\Resource as ResourceModel;
use App\Models\University;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SampleContentSeeder extends Seeder
{
    public function run(): void
    {
        $faker = fake();

        // Ensure there's at least one user for authored/owned content
        $user = User::first() ?? User::factory()->create();

        if (University::count() === 0) {
            foreach (range(1, 10) as $i) {
                University::create([
                    'name' => $name = $faker->unique()->company().' University',
                    'slug' => Str::slug($name)."-$i",
                    'description' => $faker->paragraphs(2, true),
                    'logo' => null,
                    'cover_image' => null,
                    'location' => $faker->country(),
                    'city' => $faker->city(),
                    'state' => $faker->state(),
                    'country' => $faker->countryCode(),
                    'type' => $faker->randomElement(['Public', 'Private']),
                    'ranking' => $faker->numberBetween(1, 500),
                    'acceptance_rate' => $faker->randomFloat(2, 10, 90).'%',
                    'students_count' => $faker->numberBetween(1000, 50000),
                    'tuition' => '$'.number_format($faker->numberBetween(5000, 60000)),
                    'graduation_rate' => $faker->randomFloat(2, 30, 99),
                    'retention_rate' => $faker->randomFloat(2, 30, 99),
                    'campus_setting' => $faker->randomElement(['urban', 'suburban', 'rural']),
                    'programs' => [$faker->word(), $faker->word(), $faker->word()],
                    'majors' => [$faker->word(), $faker->word()],
                    'facilities' => [$faker->word(), $faker->word()],
                    'athletics' => [$faker->word()],
                    'stats' => ['student_faculty_ratio' => $faker->randomFloat(1, 5, 25)],
                    'website' => $faker->url(),
                    'phone' => $faker->phoneNumber(),
                    'is_partner' => $faker->boolean(10),
                    'is_featured' => $faker->boolean(15),
                    'is_active' => true,
                ]);
            }
        }

        if (Company::count() === 0) {
            foreach (range(1, 10) as $i) {
                Company::create([
                    'name' => $cname = $faker->unique()->company(),
                    'slug' => Str::slug($cname)."-$i",
                    'description' => $faker->paragraphs(2, true),
                    'logo' => null,
                    'cover_image' => null,
                    'category' => $faker->randomElement(['technology', 'finance', 'healthcare', 'education']),
                    'location' => $faker->country(),
                    'city' => $faker->city(),
                    'state' => $faker->state(),
                    'country' => $faker->countryCode(),
                    'employees' => $faker->numberBetween(50, 50000),
                    'website' => $faker->url(),
                    'email' => $faker->companyEmail(),
                    'phone' => $faker->phoneNumber(),
                    'internships_count' => $faker->numberBetween(0, 50),
                    'jobs_count' => $faker->numberBetween(0, 200),
                    'is_partner' => $faker->boolean(10),
                    'is_featured' => $faker->boolean(15),
                    'is_active' => true,
                    'benefits' => [$faker->word(), $faker->word()],
                    'values' => [$faker->word(), $faker->word()],
                ]);
            }
        }

        if (Course::count() === 0) {
            foreach (range(1, 20) as $i) {
                Course::create([
                    'title' => $title = $faker->sentence(3),
                    'slug' => Str::slug($title)."-$i",
                    'description' => $faker->paragraphs(2, true),
                    'provider' => $faker->randomElement(['Coursera', 'edX', 'Udemy', 'University']),
                    'duration' => $faker->randomElement(['4 weeks', '8 weeks', '12 weeks']),
                    'level' => $faker->randomElement(['Beginner', 'Intermediate', 'Advanced']),
                    'category' => $faker->randomElement(['undergraduate', 'postgraduate', 'mooc', 'projects']),
                    'students_count' => $faker->numberBetween(100, 50000),
                    'instructor' => $faker->name(),
                    'rating' => $faker->randomFloat(2, 3, 5),
                    'reviews_count' => $faker->numberBetween(0, 5000),
                    'thumbnail' => null,
                    'video_url' => null,
                    'external_url' => $faker->url(),
                    'price' => $faker->randomFloat(2, 0, 299),
                    'is_free' => $faker->boolean(30),
                    'learning_outcomes' => [$faker->sentence(), $faker->sentence()],
                    'prerequisites' => [$faker->sentence()],
                    'syllabus' => [$faker->sentence(), $faker->sentence(), $faker->sentence()],
                    'is_featured' => $faker->boolean(10),
                    'is_active' => true,
                ]);
            }
        }

        if (Location::count() === 0) {
            foreach (range(1, 10) as $i) {
                Location::create([
                    'name' => $lname = $faker->unique()->city(),
                    'slug' => Str::slug($lname)."-$i",
                    'description' => $faker->paragraph(),
                    'city' => $lname,
                    'state' => $faker->state(),
                    'country' => $faker->country(),
                    'image' => null,
                    'universities_count' => $faker->numberBetween(1, 20),
                    'companies_count' => $faker->numberBetween(1, 50),
                    'highlights' => [$faker->sentence(), $faker->sentence()],
                    'is_featured' => $faker->boolean(20),
                ]);
            }
        }

        if (ResourceModel::count() === 0) {
            foreach (range(1, 12) as $i) {
                ResourceModel::create([
                    'user_id' => $user->id,
                    'title' => $rtitle = $faker->sentence(4),
                    'slug' => Str::slug($rtitle)."-$i",
                    'description' => $faker->paragraphs(2, true),
                    'type' => $faker->randomElement(['guide', 'video', 'tool', 'article']),
                    'url' => $faker->url(),
                    'file_path' => null,
                    'thumbnail' => null,
                    'tags' => [$faker->word(), $faker->word()],
                    'categories' => [$faker->word()],
                    'downloads_count' => $faker->numberBetween(0, 1000),
                    'views_count' => $faker->numberBetween(0, 5000),
                    'is_featured' => $faker->boolean(10),
                    'is_active' => true,
                ]);
            }
        }

        if (MarketplaceItem::count() === 0) {
            foreach (range(1, 8) as $i) {
                MarketplaceItem::create([
                    'user_id' => $user->id,
                    'title' => $mtitle = $faker->words(3, true),
                    'slug' => Str::slug($mtitle)."-$i",
                    'description' => $faker->paragraph(),
                    'category' => $faker->randomElement(['books', 'electronics', 'furniture', 'services']),
                    'price' => $faker->randomFloat(2, 5, 1000),
                    'condition' => $faker->randomElement(['new', 'like new', 'good', 'fair']),
                    'images' => [],
                    'location' => $faker->city(),
                    'contact_method' => $faker->randomElement(['email', 'phone', 'chat']),
                    'views_count' => $faker->numberBetween(0, 1000),
                    'is_active' => true,
                    'is_sold' => false,
                    'sold_at' => null,
                ]);
            }
        }

        if (Competition::count() === 0) {
            foreach (range(1, 8) as $i) {
                Competition::create([
                    'title' => $ctitle = $faker->sentence(3),
                    'slug' => Str::slug($ctitle)."-$i",
                    'description' => $faker->paragraphs(2, true),
                    'category' => $faker->randomElement(['hackathon', 'case study', 'research', 'design']),
                    'organizer' => $faker->company(),
                    'website_url' => $faker->url(),
                    'prize_amount' => $faker->randomFloat(2, 100, 10000),
                    'prize_description' => $faker->sentence(),
                    'eligibility_requirements' => [$faker->sentence(), $faker->sentence()],
                    'registration_start' => now()->subWeeks(2),
                    'registration_end' => now()->addWeeks(2),
                    'competition_date' => now()->addMonths(1),
                    'location' => $faker->city(),
                    'format' => $faker->randomElement(['online', 'in-person', 'hybrid']),
                    'image' => null,
                    'participants_count' => $faker->numberBetween(10, 1000),
                    'is_featured' => $faker->boolean(20),
                    'is_active' => true,
                ]);
            }
        }

        if (BlogPost::count() === 0) {
            foreach (range(1, 10) as $i) {
                BlogPost::create([
                    'user_id' => $user->id,
                    'title' => $btitle = $faker->sentence(6),
                    'slug' => Str::slug($btitle)."-$i",
                    'excerpt' => $faker->sentence(12),
                    'content' => collect(range(1, 5))->map(fn () => '<p>'.$faker->paragraph().'</p>')->implode(''),
                    'featured_image' => null,
                    'status' => 'published',
                    'published_at' => now()->subDays($faker->numberBetween(0, 60)),
                    'views_count' => $faker->numberBetween(0, 2000),
                    'tags' => [$faker->word(), $faker->word()],
                    'categories' => [$faker->word()],
                ]);
            }
        }

        if (Career::count() === 0) {
            $company = Company::inRandomOrder()->first() ?? Company::create([
                'name' => 'Sample Co', 'slug' => 'sample-co', 'description' => $faker->paragraph(), 'category' => 'technology', 'location' => 'USA', 'city' => 'San Francisco', 'state' => 'CA', 'country' => 'US', 'employees' => 100, 'website' => 'https://example.com', 'email' => 'hr@example.com', 'phone' => '123-456-7890', 'internships_count' => 0, 'jobs_count' => 0, 'is_partner' => false, 'is_featured' => false, 'is_active' => true, 'benefits' => ['health', 'pto'], 'values' => ['innovation'],
            ]);
            foreach (range(1, 12) as $i) {
                Career::create([
                    'company_id' => $company->id,
                    'title' => $title = $faker->jobTitle(),
                    'slug' => Str::slug($title)."-$i",
                    'description' => $faker->paragraphs(2, true),
                    'type' => $faker->randomElement(['full-time', 'part-time', 'internship', 'contract']),
                    'location' => $faker->city(),
                    'is_remote' => $faker->boolean(30),
                    'salary_range' => '$'.number_format($faker->numberBetween(40000, 150000)),
                    'experience_level' => $faker->randomElement(['entry', 'mid', 'senior', 'lead']),
                    'requirements' => [$faker->sentence(), $faker->sentence()],
                    'responsibilities' => [$faker->sentence(), $faker->sentence()],
                    'benefits' => ['health', 'pto'],
                    'skills_required' => [$faker->word(), $faker->word()],
                    'application_url' => $faker->url(),
                    'deadline' => now()->addWeeks(3),
                    'is_active' => true,
                    'is_featured' => $faker->boolean(10),
                    'applications_count' => $faker->numberBetween(0, 300),
                ]);
            }
        }

        if (AlumniAssociation::count() === 0) {
            $uni = University::inRandomOrder()->first() ?? University::first();
            if ($uni) {
                foreach (range(1, 5) as $i) {
                    AlumniAssociation::create([
                        'university_id' => $uni->id,
                        'name' => $aname = $uni->name.' Alumni '.$i,
                        'slug' => Str::slug($aname),
                        'description' => $faker->paragraph(),
                        'logo' => null,
                        'members_count' => $faker->numberBetween(100, 10000),
                        'mentors_count' => $faker->numberBetween(10, 1000),
                        'internships_count' => $faker->numberBetween(0, 1000),
                        'founded_year' => $faker->year(),
                        'website' => $faker->url(),
                        'email' => $faker->companyEmail(),
                        'phone' => $faker->phoneNumber(),
                        'features' => [$faker->word(), $faker->word()],
                        'is_active' => true,
                    ]);
                }
            }
        }
    }
}
