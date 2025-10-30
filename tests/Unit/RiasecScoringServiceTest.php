<?php

use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use App\Models\User;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;
use App\Services\Assessment\RiasecScoringService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('calculates holland code and scores from responses', function () {
    // Create assessment type
    $type = AssessmentType::create([
        'name' => 'RIASEC Interest',
        'slug' => 'riasec',
        'description' => 'RIASEC interest inventory',
        'category' => 'career_interest',
        'question_count' => 3,
        'is_active' => true,
    ]);

    // Create three questions with simple scoring maps
    $q1 = AssessmentQuestion::create([
        'assessment_type_id' => $type->id,
        'order' => 1,
        'question_text' => 'I like working with tools',
        'question_type' => 'rating_scale',
        'category' => 'Realistic',
        'options' => [
            ['value' => 1, 'label' => 'Strongly Disagree'],
            ['value' => 5, 'label' => 'Strongly Agree'],
        ],
        'scoring_map' => [
            1 => ['R' => 0],
            5 => ['R' => 4],
        ],
        'is_active' => true,
    ]);

    $q2 = AssessmentQuestion::create([
        'assessment_type_id' => $type->id,
        'order' => 2,
        'question_text' => 'I enjoy solving puzzles',
        'question_type' => 'rating_scale',
        'category' => 'Investigative',
        'options' => [
            ['value' => 1, 'label' => 'Strongly Disagree'],
            ['value' => 5, 'label' => 'Strongly Agree'],
        ],
        'scoring_map' => [
            1 => ['I' => 0],
            5 => ['I' => 4],
        ],
        'is_active' => true,
    ]);

    $q3 = AssessmentQuestion::create([
        'assessment_type_id' => $type->id,
        'order' => 3,
        'question_text' => 'I like creative activities',
        'question_type' => 'rating_scale',
        'category' => 'Artistic',
        'options' => [
            ['value' => 1, 'label' => 'Strongly Disagree'],
            ['value' => 5, 'label' => 'Strongly Agree'],
        ],
        'scoring_map' => [
            1 => ['A' => 0],
            5 => ['A' => 4],
        ],
        'is_active' => true,
    ]);

    // Create user and attempt
    $user = User::factory()->create();

    $attempt = UserAssessmentAttempt::create([
        'user_id' => $user->id,
        'assessment_type_id' => $type->id,
        'session_id' => 'test-session',
        'started_at' => now(),
    ]);

    // Respond with strong agreement to two questions to create ordering R > I > A
    UserAssessmentResponse::create([
        'attempt_id' => $attempt->id,
        'question_id' => $q1->id,
        'response_value' => 5,
        'response_score' => null,
    ]);

    UserAssessmentResponse::create([
        'attempt_id' => $attempt->id,
        'question_id' => $q2->id,
        'response_value' => 5,
        'response_score' => null,
    ]);

    UserAssessmentResponse::create([
        'attempt_id' => $attempt->id,
        'question_id' => $q3->id,
        'response_value' => 1,
        'response_score' => null,
    ]);

    $service = new RiasecScoringService();
    $riasec = $service->calculateScores($attempt);

    expect($riasec->realistic_score)->toBe(4)
        ->and($riasec->investigative_score)->toBe(4)
        ->and($riasec->artistic_score)->toBe(0);

    // Top codes should start with R and I (order between R and I may depend on tie-break)
    $codes = str_split($riasec->holland_code);
    expect($codes)->toHaveCount(3)
        ->and($codes[0])->toBeIn(['R', 'I'])
        ->and($codes[1])->toBeIn(['R', 'I'])
        ->and($codes[2])->toBe('A');
});
