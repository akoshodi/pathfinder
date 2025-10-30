<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\University>
 */
class UniversityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->company().' University';

        return [
            'name' => $name,
            'slug' => \Illuminate\Support\Str::slug($name),
            'location' => fake()->city().', '.fake()->stateAbbr(),
            'city' => fake()->city(),
            'state' => fake()->stateAbbr(),
            'country' => 'United States',
            'type' => fake()->randomElement(['Public', 'Private']),
            'ranking' => fake()->numberBetween(1, 500),
            'is_active' => true,
            'is_featured' => false,
            'is_partner' => false,
        ];
    }
}
