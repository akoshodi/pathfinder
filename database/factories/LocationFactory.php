<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $city = $this->faker->city();
        $state = $this->faker->stateAbbr();
        $name = $city.', '.$state;

        return [
            'name' => $name,
            'slug' => \Illuminate\Support\Str::slug($name).'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'description' => $this->faker->paragraphs(2, true),
            'city' => $city,
            'state' => $state,
            'country' => 'USA',
            'image' => $this->faker->optional()->imageUrl(1200, 600, 'city'),
            'universities_count' => $this->faker->numberBetween(0, 50),
            'companies_count' => $this->faker->numberBetween(0, 500),
            'highlights' => json_encode($this->faker->sentences(3)),
            'is_featured' => $this->faker->boolean(20),
        ];
    }
}
