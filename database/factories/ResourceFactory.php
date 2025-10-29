<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resource>
 */
class ResourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->words(4, true);

        return [
            'user_id' => \App\Models\User::factory(),
            'title' => ucwords($title),
            'slug' => \Illuminate\Support\Str::slug($title).'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'description' => $this->faker->paragraphs(2, true),
            // Allowed by DB CHECK constraint: 'guide', 'article', 'video', 'tool', 'template', 'other'
            'type' => $this->faker->randomElement(['guide', 'article', 'video', 'tool', 'template', 'other']),
            'url' => $this->faker->url(),
            // Use a plausible relative path string; not required to exist
            'file_path' => $this->faker->optional()->lexify('files/????????.pdf'),
            'thumbnail' => $this->faker->optional()->imageUrl(400, 300, 'business'),
            'tags' => json_encode($this->faker->words(3)),
            'categories' => json_encode($this->faker->words(2)),
            'downloads_count' => $this->faker->numberBetween(0, 1000),
            'views_count' => $this->faker->numberBetween(0, 5000),
            'is_featured' => $this->faker->boolean(15),
            'is_active' => $this->faker->boolean(90),
        ];
    }
}
