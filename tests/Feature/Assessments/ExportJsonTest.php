<?php

use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;
use App\Services\Assessment\ReportGenerationService;

use function Pest\Laravel\seed;

it('downloads a JSON report for a completed attempt', function () {
    seed(Database\Seeders\AssessmentTypeSeeder::class);
    seed(Database\Seeders\RiasecQuestionSeeder::class);

    $riasec = AssessmentType::where('slug', 'riasec')->firstOrFail();

    $attempt = UserAssessmentAttempt::create([
        'user_id' => null,
        'session_id' => 'json-test',
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

    $resp = $this->get(route('assessments.export', ['attempt' => $attempt->id]));

    $resp->assertOk();
    expect($resp->headers->get('content-type'))->toContain('application/json');

    $json = json_decode($resp->streamedContent(), true);
    expect($json)
        ->toHaveKeys(['attempt', 'assessment', 'report'])
        ->and($json['assessment'])
        ->toHaveKeys(['name', 'slug', 'category'])
        ->and($json['report'])
        ->toHaveKeys(['summary', 'top_traits', 'insights', 'recommendations', 'visualization_data']);
});
