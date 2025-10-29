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
            'type' => $this->faker->randomElement(['pdf', 'video', 'article', 'template', 'tool']),
            'url' => $this->faker->url(),
            'file_path' => $this->faker->optional()->filePath(),
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
