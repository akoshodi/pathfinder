<?php

namespace Database\Factories;

use App\Models\UserAssessmentAttempt;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserAssessmentResponse>
 */
class UserAssessmentResponseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'attempt_id' => UserAssessmentAttempt::factory(),
            'question_id' => fake()->numberBetween(1, 100),
            'response_value' => fake()->numberBetween(1, 5),
            'response_text' => null,
            'question_category' => fake()->randomElement(['Cognitive', 'Technical', 'Social', 'Management', 'Creative']),
        ];
    }
}
