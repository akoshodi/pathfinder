<?php

use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use App\Models\UserAssessmentAttempt;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\seed;

it('runs RIASEC start → answer → complete → results flow', function () {
    // Seed only what we need for speed
    seed(Database\Seeders\AssessmentTypeSeeder::class);
    seed(Database\Seeders\RiasecQuestionSeeder::class);

    $riasec = AssessmentType::where('slug', 'riasec')->firstOrFail();

    // Start a new anonymous attempt
    $start = $this->post(route('assessments.start', ['slug' => 'riasec']))
        ->assertRedirect();

    // Extract attempt id from redirect URL
    $location = $start->headers->get('Location');
    expect($location)->toContain('/assessments/');

    $attemptId = (int) Str::of($location)
        ->after('/assessments/')
        ->before('/take')
        ->toString();

    expect($attemptId)->toBeGreaterThan(0);

    // Answer a few questions positively to produce non-zero scores
    $questions = AssessmentQuestion::where('assessment_type_id', $riasec->id)
        ->orderBy('order')
        ->limit(5)
        ->get();

    foreach ($questions as $q) {
        $this->post(route('assessments.answer', ['attempt' => $attemptId]), [
            'question_id' => $q->id,
            'response_value' => 5, // Strongly Agree
            'time_spent' => 1,
        ])->assertSuccessful();
    }

    // Complete the assessment, which should generate a report
    $this->post(route('assessments.complete', ['attempt' => $attemptId]))
        ->assertRedirect(route('assessments.results', ['attempt' => $attemptId]));

    // View the results and validate structure via Inertia assertions
    $this->get(route('assessments.results', ['attempt' => $attemptId]))
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('Assessments/Results')
            ->where('assessment.category', 'career_interest')
            ->has('report.id')
            ->has('report.visualization_data')
            ->has('report.insights')
            ->has('riasec.holland_code')
        );

    // Sanity check: attempt marked completed
    $attempt = UserAssessmentAttempt::findOrFail($attemptId);
    expect($attempt->completed_at)->not->toBeNull();
});
