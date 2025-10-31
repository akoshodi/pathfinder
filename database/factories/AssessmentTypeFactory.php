<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AssessmentType>
 */
class AssessmentTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $slug = fake()->unique()->slug(2);

        return [
            'name' => fake()->words(3, true),
            'slug' => $slug,
            'description' => fake()->sentence(),
            'category' => fake()->randomElement(['career_interest', 'skills', 'personality']),
            'question_count' => fake()->numberBetween(0, 60),
            'duration_minutes' => fake()->numberBetween(0, 30),
            'scoring_config' => [
                'time_limit_minutes' => 30,
                'pass_threshold' => 70,
            ],
            'instructions' => fake()->sentence(8),
            'is_active' => true,
        ];
    }
}
