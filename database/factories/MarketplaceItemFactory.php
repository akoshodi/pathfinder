<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MarketplaceItem>
 */
class MarketplaceItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->words(3, true);

        return [
            'user_id' => \App\Models\User::factory(),
            'title' => ucfirst($title),
            'slug' => \Illuminate\Support\Str::slug($title).'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'description' => $this->faker->paragraphs(2, true),
            'category' => $this->faker->randomElement(['Books', 'Electronics', 'Furniture', 'Clothing', 'Sports', 'Other']),
            'price' => $this->faker->randomFloat(2, 5, 500),
            'condition' => $this->faker->randomElement(['new', 'like-new', 'good', 'fair']),
            'images' => json_encode([$this->faker->imageUrl(), $this->faker->imageUrl()]),
            'location' => $this->faker->city().', '.$this->faker->stateAbbr(),
            'contact_method' => $this->faker->randomElement(['email', 'phone', 'message']),
            'views_count' => $this->faker->numberBetween(0, 500),
            'is_active' => $this->faker->boolean(80),
            'is_sold' => $this->faker->boolean(20),
            'sold_at' => $this->faker->optional(0.2)->dateTimeBetween('-3 months', 'now'),
        ];
    }
}
