<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogPost>
 */
class BlogPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence();

        return [
            'user_id' => \App\Models\User::factory(),
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title).'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'excerpt' => $this->faker->paragraph(),
            'content' => $this->faker->paragraphs(8, true),
            'featured_image' => $this->faker->optional()->imageUrl(1200, 630, 'article'),
            // Allowed by DB CHECK constraint: 'draft', 'published', 'archived'
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']),
            'published_at' => $this->faker->optional(0.8)->dateTimeBetween('-1 year', 'now'),
            'views_count' => $this->faker->numberBetween(0, 10000),
            'tags' => json_encode($this->faker->words(3)),
            'categories' => json_encode($this->faker->words(2)),
        ];
    }
}
