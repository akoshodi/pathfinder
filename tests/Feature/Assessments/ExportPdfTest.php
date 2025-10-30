<?php

use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;
use App\Services\Assessment\ReportGenerationService;

use function Pest\Laravel\seed;

it('downloads a PDF report for a completed attempt', function () {
    if (! class_exists(\Barryvdh\DomPDF\Facade\Pdf::class)) {
        $this->markTestSkipped('PDF package not installed');
    }

    seed(Database\Seeders\AssessmentTypeSeeder::class);
    seed(Database\Seeders\RiasecQuestionSeeder::class);

    $riasec = AssessmentType::where('slug', 'riasec')->firstOrFail();

    $attempt = UserAssessmentAttempt::create([
        'user_id' => null,
        'session_id' => 'pdf-test',
        'assessment_type_id' => $riasec->id,
        'started_at' => now(),
        'completed_at' => now(),
    ]);

    // Provide a few responses so report has data
    $questions = AssessmentQuestion::where('assessment_type_id', $riasec->id)
        ->orderBy('order')
        ->limit(5)
        ->get();

    foreach ($questions as $q) {
        UserAssessmentResponse::create([
            'attempt_id' => $attempt->id,
            'question_id' => $q->id,
            'response_value' => 5,
            'response_score' => null,
            'time_spent_seconds' => 1,
        ]);
    }

    (new ReportGenerationService())->generate($attempt);

    $resp = $this->get(route('assessments.export.pdf', ['attempt' => $attempt->id]));

    $resp->assertOk();
    expect($resp->headers->get('content-type'))->toContain('application/pdf');
});
