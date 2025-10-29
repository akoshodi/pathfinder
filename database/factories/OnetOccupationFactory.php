<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OnetOccupation>
 */
class OnetOccupationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $code = $this->faker->numerify('##-####.##');
        
        return [
            'onetsoc_code' => $code,
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(),
        ];
    }
}
