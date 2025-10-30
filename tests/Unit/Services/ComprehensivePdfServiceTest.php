<?php

use App\Models\AssessmentType;
use App\Models\User;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;
use App\Services\Assessment\CareerFitAnalysisService;
use App\Services\Assessment\ComprehensivePdfService;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
    
    $this->user = User::factory()->create();
    $this->careerFitService = Mockery::mock(CareerFitAnalysisService::class);
    $this->service = new ComprehensivePdfService($this->careerFitService);
    
    // Create assessment types
    $this->riasecType = AssessmentType::factory()->create(['slug' => 'riasec']);
    $this->skillsType = AssessmentType::factory()->create(['slug' => 'skills']);
    $this->personalityType = AssessmentType::factory()->create(['slug' => 'personality']);
});

it('generates career fit PDF successfully', function () {
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

    $personalityAttempt = UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->personalityType->id,
        'completed_at' => now(),
    ]);

    // Add sample responses
    UserAssessmentResponse::factory()->create([
        'attempt_id' => $riasecAttempt->id,
        'question_id' => 1,
        'response_value' => 4,
        'question_category' => 'Investigative',
    ]);

    UserAssessmentResponse::factory()->create([
        'attempt_id' => $skillsAttempt->id,
        'question_id' => 1,
        'response_value' => 4,
        'question_category' => 'Technical',
    ]);

    UserAssessmentResponse::factory()->create([
        'attempt_id' => $personalityAttempt->id,
        'question_id' => 1,
        'response_value' => 4,
        'question_category' => 'Openness',
    ]);

    // Mock the analysis result
    $mockAnalysis = [
        'profile' => [
            'interests' => [['code' => 'Investigative', 'score' => 80]],
            'skills' => [['domain' => 'Technical', 'score' => 75, 'level' => 'Proficient']],
            'personality' => [['trait' => 'Openness', 'score' => 4]],
        ],
        'career_matches' => [
            [
                'code' => '15-1252',
                'title' => 'Software Developer',
                'description' => 'Develop software applications',
                'interest_fit' => 85,
                'skills_fit' => 80,
                'personality_fit' => 75,
                'composite_score' => 81,
            ],
        ],
        'skill_gaps' => [],
        'learning_paths' => [],
        'overall_readiness' => [
            'level' => 'High',
            'score' => 81,
            'description' => 'Strong readiness for career transition',
        ],
    ];

    $this->careerFitService->shouldReceive('analyzeCareerFit')
        ->once()
        ->with($this->user)
        ->andReturn($mockAnalysis);

    $path = $this->service->generateCareerFitPdf($this->user->id);

    expect($path)->toBeString()
        ->and($path)->toContain('career-fit-analysis')
        ->and($path)->toContain('.pdf')
        ->and(Storage::disk('public')->exists($path))->toBeTrue();
});

it('throws exception when user has not completed all assessments', function () {
    $this->careerFitService->shouldReceive('analyzeCareerFit')
        ->once()
        ->with($this->user)
        ->andThrow(new Exception('User must complete all assessments'));

    $this->service->generateCareerFitPdf($this->user->id);
})->throws(Exception::class);

it('generates PDF with correct filename format', function () {
    // Create completed attempts with minimal data
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

    UserAssessmentResponse::factory()->create([
        'attempt_id' => 1,
        'question_id' => 1,
        'response_value' => 3,
        'question_category' => 'Test',
    ]);

    $mockAnalysis = [
        'profile' => [
            'interests' => [],
            'skills' => [],
            'personality' => [],
        ],
        'career_matches' => [],
        'skill_gaps' => [],
        'learning_paths' => [],
        'overall_readiness' => [
            'level' => 'Moderate',
            'score' => 60,
            'description' => 'Developing readiness',
        ],
    ];

    $this->careerFitService->shouldReceive('analyzeCareerFit')
        ->once()
        ->andReturn($mockAnalysis);

    $path = $this->service->generateCareerFitPdf($this->user->id);

    expect($path)->toMatch('/^reports\/career-fit-analysis-\d+-\d{14}\.pdf$/');
});
