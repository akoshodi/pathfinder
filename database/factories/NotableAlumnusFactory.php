<?php

namespace Database\Factories;

use App\Models\NotableAlumnus;
use App\Models\University;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NotableAlumnus>
 */
class NotableAlumnusFactory extends Factory
{
    protected $model = NotableAlumnus::class;

    public function definition(): array
    {
        return [
            'university_id' => University::factory(),
            'name' => $this->faker->name(),
            'title' => $this->faker->jobTitle(),
            'image' => $this->faker->imageUrl(200, 200, 'people', true),
            'bio' => $this->faker->sentence(),
            'graduation_year' => $this->faker->optional()->numberBetween(1960, (int) date('Y')),
            'order_column' => $this->faker->numberBetween(1, 10),
        ];
    }
}
