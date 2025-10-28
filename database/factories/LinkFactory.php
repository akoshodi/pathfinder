<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Link>
 */
class LinkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $url = $this->faker->url();

        return [
            'user_id' => \App\Models\User::factory(),
            'title' => $this->faker->sentence(6),
            'url' => $url,
            'description' => $this->faker->optional()->sentence(12),
        ];
    }
}
