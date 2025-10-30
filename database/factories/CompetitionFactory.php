<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Competition>
 */
class CompetitionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->words(3, true).' Competition';

        return [
            'title' => ucwords($title),
            'slug' => \Illuminate\Support\Str::slug($title).'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'description' => $this->faker->paragraphs(3, true),
            'category' => $this->faker->randomElement(['Hackathon', 'Business', 'Design', 'Research', 'Innovation']),
            'organizer' => $this->faker->company(),
            'website_url' => $this->faker->url(),
            'prize_amount' => $this->faker->randomFloat(2, 500, 50000),
            'prize_description' => $this->faker->sentence(),
            'eligibility_requirements' => $this->faker->paragraph(),
            'registration_start' => $this->faker->dateTimeBetween('now', '+1 month'),
            'registration_end' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
            'competition_date' => $this->faker->dateTimeBetween('+2 months', '+4 months'),
            'location' => $this->faker->city().', '.$this->faker->stateAbbr(),
            'format' => $this->faker->randomElement(['in-person', 'virtual', 'hybrid']),
            'image' => $this->faker->optional()->imageUrl(1200, 600, 'business'),
            'participants_count' => $this->faker->numberBetween(0, 500),
            'is_featured' => $this->faker->boolean(20),
            'is_active' => $this->faker->boolean(80),
        ];
    }
}
