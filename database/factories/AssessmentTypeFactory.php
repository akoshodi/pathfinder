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
            'config' => json_encode([
                'time_limit_minutes' => 30,
                'pass_threshold' => 70,
            ]),
            'is_active' => true,
        ];
    }
}
