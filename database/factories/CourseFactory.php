<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->catchPhrase().' Course';
        
        return [
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title).'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'description' => $this->faker->paragraphs(3, true),
            'provider' => $this->faker->randomElement(['Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'Pluralsight']),
            'duration' => $this->faker->randomElement(['4 weeks', '8 weeks', '12 weeks', '6 months', 'Self-paced']),
            'level' => $this->faker->randomElement(['Beginner', 'Intermediate', 'Advanced']),
            'category' => $this->faker->randomElement(['undergraduate', 'postgraduate', 'mooc', 'projects']),
            'students_count' => $this->faker->numberBetween(100, 50000),
            'instructor' => $this->faker->name(),
            'rating' => $this->faker->randomFloat(1, 3.5, 5.0),
            'reviews_count' => $this->faker->numberBetween(10, 1000),
            'thumbnail' => $this->faker->optional()->imageUrl(640, 480, 'education'),
            'video_url' => $this->faker->optional()->url(),
            'external_url' => $this->faker->url(),
            'price' => $this->faker->randomFloat(2, 19.99, 299.99),
            'is_free' => $this->faker->boolean(20),
            'learning_outcomes' => json_encode($this->faker->sentences(5)),
            'prerequisites' => $this->faker->optional()->paragraph(),
            'syllabus' => $this->faker->optional()->paragraphs(3, true),
            'is_featured' => $this->faker->boolean(15),
            'is_active' => $this->faker->boolean(90),
        ];
    }
}
