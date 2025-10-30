<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;
use App\Services\Assessment\PersonalityScoringService;

use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

it('computes Big Five averages and preferences', function () {
    seed(Database\Seeders\AssessmentTypeSeeder::class);
    seed(Database\Seeders\PersonalityQuestionSeeder::class);

    $personalityType = AssessmentType::where('slug', 'personality')->firstOrFail();

    $attempt = UserAssessmentAttempt::create([
        'user_id' => null,
        'session_id' => 'test-session',
        'assessment_type_id' => $personalityType->id,
        'started_at' => now(),
        'completed_at' => now(),
    ]);

    // Answer 2 questions per trait with mixed values to exercise averaging and reverse scoring
    $counts = [];
    $questions = AssessmentQuestion::where('assessment_type_id', $personalityType->id)
        ->orderBy('order')
        ->get();

    foreach ($questions as $q) {
        $trait = $q->category;
        $counts[$trait] = ($counts[$trait] ?? 0);
        if ($counts[$trait] < 2) {
            // Alternate 5 and 3 to produce mid-to-high averages
            $value = $counts[$trait] === 0 ? 5 : 3;
            $map = $q->scoring_map[$value] ?? ['score' => $value];

            UserAssessmentResponse::create([
                'attempt_id' => $attempt->id,
                'question_id' => $q->id,
                'response_value' => $value,
                'response_score' => $map['score'] ?? $value,
                'time_spent_seconds' => 1,
            ]);

            $counts[$trait]++;
        }

        if (count(array_filter($counts, fn ($c) => $c >= 2)) >= 5) {
            break;
        }
    }

    $service = new PersonalityScoringService();
    $service->calculateScores($attempt);

    $attempt->refresh();

    $normalized = $attempt->normalized_scores;
    expect($normalized)->toHaveKeys(['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Emotional Stability']);

    // Scores should be between 0 and 100
    foreach ($normalized as $score) {
        expect($score)->toBeGreaterThanOrEqual(0)->toBeLessThanOrEqual(100);
    }

    // Preferences saved on PersonalityTrait
    $trait = $attempt->personalityTrait;
    expect($trait)->not->toBeNull();
    expect($trait->work_style_preferences)->toBeArray();
});
