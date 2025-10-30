<?php

namespace Database\Factories;

use App\Models\AssessmentType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserAssessmentAttempt>
 */
class UserAssessmentAttemptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'assessment_type_id' => AssessmentType::factory(),
            'started_at' => now(),
            'completed_at' => null,
        ];
    }

    /**
     * Indicate that the attempt is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'completed_at' => now(),
        ]);
    }
}
