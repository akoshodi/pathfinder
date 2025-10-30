<?php

namespace Database\Seeders;

use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;
use App\Services\Assessment\ReportGenerationService;
use Illuminate\Database\Seeder;

class DemoAssessmentSeeder extends Seeder
{
    /**
     * Seed a completed RIASEC attempt with a generated report for quick demos.
     */
    public function run(): void
    {
        // Ensure base seeders have run
        $this->call([
            AssessmentTypeSeeder::class,
            RiasecQuestionSeeder::class,
            SkillsQuestionSeeder::class,
            PersonalityQuestionSeeder::class,
        ]);

        $riasec = AssessmentType::where('slug', 'riasec')->first();
        if (! $riasec) {
            $this->command?->warn('RIASEC type missing; skipping demo attempt.');

            return;
        }

        // Create anonymous attempt
        $attempt = UserAssessmentAttempt::firstOrCreate([
            'user_id' => null,
            'session_id' => 'demo-session',
            'assessment_type_id' => $riasec->id,
        ], [
            'started_at' => now()->subMinutes(5),
            'completed_at' => now()->subMinutes(1),
        ]);

        // If already has responses, skip
        if ($attempt->responses()->exists()) {
            // Ensure report exists
            if (! $attempt->report) {
                (new ReportGenerationService())->generate($attempt);
            }

            return;
        }

        // Answer first 12 questions with a positive response to generate non-zero scores
        $questions = AssessmentQuestion::where('assessment_type_id', $riasec->id)
            ->orderBy('order')
            ->limit(12)
            ->get();

        foreach ($questions as $q) {
            UserAssessmentResponse::create([
                'attempt_id' => $attempt->id,
                'question_id' => $q->id,
                'response_value' => 5,
                'response_score' => null,
                'time_spent_seconds' => 2,
            ]);
        }

        // Mark attempt completed and generate report
        $attempt->update(['completed_at' => now()]);
        (new ReportGenerationService())->generate($attempt);

        $this->command?->info('Seeded demo RIASEC attempt with report (attempt ID: '.$attempt->id.').');

        // === Skills demo attempt ===
        $skills = AssessmentType::where('slug', 'skills')->first();
        if ($skills) {
            $skillsAttempt = UserAssessmentAttempt::firstOrCreate([
                'user_id' => null,
                'session_id' => 'demo-session-skills',
                'assessment_type_id' => $skills->id,
            ], [
                'started_at' => now()->subMinutes(5),
                'completed_at' => now()->subMinutes(1),
            ]);

            if (! $skillsAttempt->responses()->exists()) {
                $skillsQuestions = AssessmentQuestion::where('assessment_type_id', $skills->id)
                    ->orderBy('order')
                    ->limit(10)
                    ->get();

                foreach ($skillsQuestions as $q) {
                    // Mix strong and moderate answers to create varied bars
                    $val = $q->order % 2 === 0 ? 5 : 4;
                    UserAssessmentResponse::create([
                        'attempt_id' => $skillsAttempt->id,
                        'question_id' => $q->id,
                        'response_value' => $val,
                        'response_score' => $val,
                        'time_spent_seconds' => 2,
                    ]);
                }

                $skillsAttempt->update(['completed_at' => now()]);
                (new ReportGenerationService())->generate($skillsAttempt);
                $this->command?->info('Seeded demo Skills attempt with report (attempt ID: '.$skillsAttempt->id.').');
            }
        }

        // === Personality demo attempt ===
        $personality = AssessmentType::where('slug', 'personality')->first();
        if ($personality) {
            $personAttempt = UserAssessmentAttempt::firstOrCreate([
                'user_id' => null,
                'session_id' => 'demo-session-personality',
                'assessment_type_id' => $personality->id,
            ], [
                'started_at' => now()->subMinutes(5),
                'completed_at' => now()->subMinutes(1),
            ]);

            if (! $personAttempt->responses()->exists()) {
                $persQuestions = AssessmentQuestion::where('assessment_type_id', $personality->id)
                    ->orderBy('order')
                    ->limit(10)
                    ->get();

                foreach ($persQuestions as $q) {
                    // Alternate 5 and 3 to exercise reverse scoring
                    $val = $q->order % 2 === 0 ? 5 : 3;
                    $score = $q->scoring_map[$val]['score'] ?? $val;
                    UserAssessmentResponse::create([
                        'attempt_id' => $personAttempt->id,
                        'question_id' => $q->id,
                        'response_value' => $val,
                        'response_score' => $score,
                        'time_spent_seconds' => 2,
                    ]);
                }

                $personAttempt->update(['completed_at' => now()]);
                (new ReportGenerationService())->generate($personAttempt);
                $this->command?->info('Seeded demo Personality attempt with report (attempt ID: '.$personAttempt->id.').');
            }
        }
    }
}
