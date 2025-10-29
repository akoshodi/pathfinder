<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Career>
 */
class CareerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->jobTitle();
        
        return [
            'company_id' => \App\Models\Company::factory(),
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title).'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'description' => $this->faker->paragraphs(3, true),
            'type' => $this->faker->randomElement(['full-time', 'part-time', 'contract', 'internship']),
            'location' => $this->faker->city().', '.$this->faker->stateAbbr(),
            'is_remote' => $this->faker->boolean(30),
            'salary_range' => $this->faker->randomElement(['$40k-$60k', '$60k-$80k', '$80k-$100k', '$100k-$120k', '$120k+']),
            'experience_level' => $this->faker->randomElement(['entry', 'mid', 'senior', 'lead']),
            'requirements' => $this->faker->paragraphs(2, true),
            'responsibilities' => $this->faker->paragraphs(2, true),
            'benefits' => $this->faker->optional()->paragraph(),
            'skills_required' => json_encode($this->faker->words(5)),
            'application_url' => $this->faker->url(),
            'deadline' => $this->faker->optional()->dateTimeBetween('now', '+3 months'),
            'is_active' => $this->faker->boolean(80),
            'is_featured' => $this->faker->boolean(20),
            'applications_count' => $this->faker->numberBetween(0, 100),
        ];
    }
}
