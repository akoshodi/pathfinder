<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class SponsoredAdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some universities to sponsor
        $universities = \App\Models\University::query()->inRandomOrder()->limit(5)->get();

        foreach ($universities as $index => $uni) {
            \App\Models\SponsoredAd::create([
                'university_id' => $uni->id,
                'campaign_name' => "Featured {$uni->name}",
                'tagline' => "Discover excellence at {$uni->name}. Apply today!",
                'position' => $index + 1,
                'is_active' => true,
                'starts_at' => now()->subDays(5),
                'ends_at' => now()->addDays(60),
            ]);
        }
    }
}
