<?php

namespace Database\Seeders;

use App\Models\NotableAlumnus;
use App\Models\University;
use Illuminate\Database\Seeder;

class NotableAlumnusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $universities = University::query()->take(10)->get();

        foreach ($universities as $university) {
            NotableAlumnus::factory()
                ->count(rand(2, 5))
                ->create([
                    'university_id' => $university->id,
                ]);
        }
    }
}
