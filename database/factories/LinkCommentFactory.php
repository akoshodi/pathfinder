<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LinkComment>
 */
class LinkCommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'link_id' => \App\Models\Link::factory(),
            'user_id' => \App\Models\User::factory(),
            'parent_id' => null,
            'body' => $this->faker->sentences(asText: true),
        ];
    }
}
