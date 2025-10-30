<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Program>
 */
class ProgramFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->words(3, true).' Program';

        return [
            'name' => ucwords($name),
            'slug' => \Illuminate\Support\Str::slug($name).'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'category' => $this->faker->randomElement(['Engineering', 'Business', 'Arts', 'Science', 'Technology']),
            'description' => $this->faker->paragraphs(2, true),
        ];
    }
}
