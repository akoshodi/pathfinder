<?php

use App\Models\AssessmentType;
use App\Models\User;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;
use App\Services\Assessment\SkillsScoringService;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->skillsType = AssessmentType::factory()->create(['slug' => 'skills']);
    $this->service = new SkillsScoringService();
});

it('calculates skill scores correctly from responses', function () {
    $attempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->skillsType->id,
        'completed_at' => now(),
    ]);

    // Create responses for Cognitive domain (5 questions, average = 4)
    for ($i = 1; $i <= 5; $i++) {
        UserAssessmentResponse::factory()->create([
            'attempt_id' => $attempt->id,
            'question_id' => $i,
            'response_value' => 4,
            'question_category' => 'Cognitive',
        ]);
    }

    // Create responses for Technical domain (5 questions, average = 3)
    for ($i = 6; $i <= 10; $i++) {
        UserAssessmentResponse::factory()->create([
            'attempt_id' => $attempt->id,
            'question_id' => $i,
            'response_value' => 3,
            'question_category' => 'Technical',
        ]);
    }

    $scores = $this->service->calculateScores($attempt);

    expect($scores)->toBeArray()
        ->and($scores)->toHaveKey('Cognitive')
        ->and($scores)->toHaveKey('Technical')
        ->and($scores['Cognitive']['score'])->toBe(75.0) // (4-1)/(5-1) * 100 = 75
        ->and($scores['Technical']['score'])->toBe(50.0) // (3-1)/(5-1) * 100 = 50
        ->and($scores['Cognitive']['level'])->toBe('Proficient')
        ->and($scores['Technical']['level'])->toBe('Intermediate');
});

it('determines correct proficiency levels', function () {
    $attempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->skillsType->id,
        'completed_at' => now(),
    ]);

    // Test different score levels
    $testCases = [
        ['value' => 1, 'expected_score' => 0.0, 'expected_level' => 'Novice'],
        ['value' => 2, 'expected_score' => 25.0, 'expected_level' => 'Intermediate'],
        ['value' => 3, 'expected_score' => 50.0, 'expected_level' => 'Intermediate'],
        ['value' => 4, 'expected_score' => 75.0, 'expected_level' => 'Proficient'],
        ['value' => 5, 'expected_score' => 100.0, 'expected_level' => 'Expert'],
    ];

    foreach ($testCases as $index => $case) {
        $domain = "Domain{$index}";
        
        UserAssessmentResponse::factory()->create([
            'attempt_id' => $attempt->id,
            'question_id' => 100 + $index,
            'response_value' => $case['value'],
            'question_category' => $domain,
        ]);
    }

    $scores = $this->service->calculateScores($attempt);

    foreach ($testCases as $index => $case) {
        $domain = "Domain{$index}";
        expect($scores[$domain]['score'])->toBe($case['expected_score'])
            ->and($scores[$domain]['level'])->toBe($case['expected_level']);
    }
});

it('handles empty responses gracefully', function () {
    $attempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->skillsType->id,
        'completed_at' => now(),
    ]);

    $scores = $this->service->calculateScores($attempt);

    expect($scores)->toBeArray()->toBeEmpty();
});

it('groups responses by category correctly', function () {
    $attempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->skillsType->id,
        'completed_at' => now(),
    ]);

    $categories = ['Cognitive', 'Technical', 'Social', 'Management', 'Creative'];
    
    foreach ($categories as $index => $category) {
        UserAssessmentResponse::factory()->create([
            'attempt_id' => $attempt->id,
            'question_id' => $index + 1,
            'response_value' => 3,
            'question_category' => $category,
        ]);
    }

    $scores = $this->service->calculateScores($attempt);

    expect($scores)->toHaveCount(5)
        ->and(array_keys($scores))->toEqual($categories);
});
