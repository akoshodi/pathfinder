<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SponsoredAd>
 */
class SponsoredAdFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'university_id' => \App\Models\University::factory(),
            'campaign_name' => $this->faker->words(3, true),
            'tagline' => $this->faker->sentence(8),
            'position' => $this->faker->numberBetween(1, 10),
            'is_active' => true,
            'starts_at' => now()->subDays(7),
            'ends_at' => now()->addDays(30),
        ];
    }
}
