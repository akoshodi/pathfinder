<?php

use App\Models\AssessmentType;
use App\Models\User;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;
use App\Services\Assessment\CareerFitAnalysisService;
use App\Services\Assessment\CareerMatchingService;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->careerMatchingService = Mockery::mock(CareerMatchingService::class);
    $this->service = new CareerFitAnalysisService($this->careerMatchingService);
    
    // Create assessment types
    $this->riasecType = AssessmentType::factory()->create(['slug' => 'riasec']);
    $this->skillsType = AssessmentType::factory()->create(['slug' => 'skills']);
    $this->personalityType = AssessmentType::factory()->create(['slug' => 'personality']);
});

it('detects when user has not completed all assessments', function () {
    expect($this->service->hasCompletedAllAssessments($this->user))->toBeFalse();
});

it('detects when user has completed all assessments', function () {
    // Create completed attempts for all three assessments
    UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->riasecType->id,
        'completed_at' => now(),
    ]);

    UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->skillsType->id,
        'completed_at' => now(),
    ]);

    UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->personalityType->id,
        'completed_at' => now(),
    ]);

    expect($this->service->hasCompletedAllAssessments($this->user))->toBeTrue();
});

it('throws exception when attempting analysis without all assessments', function () {
    $this->service->analyzeCareerFit($this->user);
})->throws(Exception::class, 'User must complete RIASEC, Skills, and Personality assessments first.');

it('builds user profile correctly', function () {
    // Create completed attempts with responses
    $riasecAttempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->riasecType->id,
        'completed_at' => now(),
    ]);

    $skillsAttempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->skillsType->id,
        'completed_at' => now(),
    ]);

    $personalityAttempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->personalityType->id,
        'completed_at' => now(),
    ]);

    // Add RIASEC responses
    foreach (['Realistic', 'Investigative', 'Artistic'] as $index => $code) {
        UserAssessmentResponse::factory()->create([
            'attempt_id' => $riasecAttempt->id,
            'question_id' => $index + 1,
            'response_value' => 4,
            'question_category' => $code,
        ]);
    }

    // Add Skills responses
    foreach (['Cognitive', 'Technical'] as $index => $domain) {
        UserAssessmentResponse::factory()->create([
            'attempt_id' => $skillsAttempt->id,
            'question_id' => $index + 1,
            'response_value' => 4,
            'question_category' => $domain,
        ]);
    }

    // Add Personality responses
    foreach (['Openness', 'Conscientiousness'] as $index => $trait) {
        UserAssessmentResponse::factory()->create([
            'attempt_id' => $personalityAttempt->id,
            'question_id' => $index + 1,
            'response_value' => 4,
            'question_category' => $trait,
        ]);
    }

    $profile = $this->service->buildUserProfile($this->user);

    expect($profile)->toBeArray()
        ->and($profile)->toHaveKeys(['interests', 'skills', 'personality'])
        ->and($profile['interests'])->not->toBeEmpty()
        ->and($profile['skills'])->not->toBeEmpty()
        ->and($profile['personality'])->not->toBeEmpty();
});

it('calculates overall readiness correctly', function () {
    $testCases = [
        ['composite' => 85, 'expected_level' => 'High', 'min_score' => 80],
        ['composite' => 75, 'expected_level' => 'Moderate', 'min_score' => 70],
        ['composite' => 65, 'expected_level' => 'Developing', 'min_score' => 60],
        ['composite' => 55, 'expected_level' => 'Early', 'min_score' => 50],
    ];

    foreach ($testCases as $case) {
        $readiness = $this->service->calculateOverallReadiness($case['composite']);
        
        expect($readiness)->toBeArray()
            ->and($readiness['level'])->toBe($case['expected_level'])
            ->and($readiness['score'])->toBe($case['composite'])
            ->and($readiness['description'])->toBeString();
    }
});

it('generates learning paths for top careers', function () {
    // Create completed attempts
    $riasecAttempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->riasecType->id,
        'completed_at' => now(),
    ]);

    $skillsAttempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->skillsType->id,
        'completed_at' => now(),
    ]);

    UserAssessmentResponse::factory()->create([
        'attempt_id' => $riasecAttempt->id,
        'question_id' => 1,
        'response_value' => 4,
        'question_category' => 'Investigative',
    ]);

    UserAssessmentResponse::factory()->create([
        'attempt_id' => $skillsAttempt->id,
        'question_id' => 1,
        'response_value' => 3,
        'question_category' => 'Technical',
    ]);

    $topCareers = [
        (object) ['code' => '15-1252', 'title' => 'Software Developer'],
        (object) ['code' => '15-1244', 'title' => 'Data Scientist'],
    ];

    $skillGaps = [
        'Software Developer' => [
            ['skill' => 'Programming', 'gap' => 30, 'priority' => 'High'],
        ],
        'Data Scientist' => [
            ['skill' => 'Statistics', 'gap' => 25, 'priority' => 'High'],
        ],
    ];

    $paths = $this->service->generateLearningPaths($topCareers, $skillGaps);

    expect($paths)->toBeArray()
        ->and($paths)->toHaveCount(2)
        ->and($paths[0])->toHaveKeys(['career', 'phases'])
        ->and($paths[0]['phases'])->toHaveCount(3)
        ->and($paths[0]['phases'][0])->toHaveKeys(['phase', 'duration', 'resources']);
});

it('analyzes skill gaps for careers', function () {
    $riasecAttempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->riasecType->id,
        'completed_at' => now(),
    ]);

    $skillsAttempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->skillsType->id,
        'completed_at' => now(),
    ]);

    UserAssessmentResponse::factory()->create([
        'attempt_id' => $riasecAttempt->id,
        'question_id' => 1,
        'response_value' => 4,
        'question_category' => 'Investigative',
    ]);

    UserAssessmentResponse::factory()->create([
        'attempt_id' => $skillsAttempt->id,
        'question_id' => 1,
        'response_value' => 2, // Low skill level
        'question_category' => 'Technical',
    ]);

    $topCareers = [
        (object) ['code' => '15-1252', 'title' => 'Software Developer'],
    ];

    $gaps = $this->service->analyzeSkillGaps($this->user, $topCareers);

    expect($gaps)->toBeArray()
        ->and($gaps)->toHaveKey('Software Developer')
        ->and($gaps['Software Developer'])->toBeArray();
});
