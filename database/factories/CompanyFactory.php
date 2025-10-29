<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->company();
        
        return [
            'name' => $name,
            'slug' => \Illuminate\Support\Str::slug($name).'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'description' => $this->faker->paragraphs(3, true),
            'logo' => $this->faker->optional()->imageUrl(200, 200, 'business'),
            'cover_image' => $this->faker->optional()->imageUrl(1200, 400, 'business'),
            'category' => $this->faker->randomElement(['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing']),
            'location' => $this->faker->city().', '.$this->faker->stateAbbr(),
            'city' => $this->faker->city(),
            'state' => $this->faker->stateAbbr(),
            'country' => 'USA',
            'employees' => $this->faker->randomElement(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']),
            'website' => $this->faker->url(),
            'email' => $this->faker->companyEmail(),
            'phone' => $this->faker->phoneNumber(),
            'internships_count' => $this->faker->numberBetween(0, 20),
            'jobs_count' => $this->faker->numberBetween(0, 50),
            'is_partner' => $this->faker->boolean(30),
            'is_featured' => $this->faker->boolean(20),
            'is_active' => $this->faker->boolean(90),
            'benefits' => json_encode($this->faker->sentences(5)),
            'values' => json_encode($this->faker->sentences(3)),
        ];
    }
}
