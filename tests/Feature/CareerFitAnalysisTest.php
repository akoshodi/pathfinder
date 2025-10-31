<?php

use App\Models\AssessmentType;
use App\Models\User;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = User::factory()->create();

    $this->riasecType = AssessmentType::factory()->create(['slug' => 'riasec']);
    $this->skillsType = AssessmentType::factory()->create(['slug' => 'skills']);
    $this->personalityType = AssessmentType::factory()->create(['slug' => 'personality']);
});

it('requires authentication to access career fit analysis', function () {
    $response = $this->get('/career-fit');

    $response->assertRedirect('/login');
});

it('shows incomplete assessments message when not all assessments completed', function () {
    $response = $this->actingAs($this->user)->get('/career-fit');

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Assessments/CareerFit')
            ->where('hasRequiredAssessments', false)
            ->has('requiredAssessments')
        );
});

it('displays career fit analysis when all assessments completed', function () {
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

    // Add minimal responses for each assessment
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

    $response = $this->actingAs($this->user)->get('/career-fit');

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Assessments/CareerFit')
            ->where('hasRequiredAssessments', true)
            ->has('analysis')
            ->has('analysis.profile')
            ->has('analysis.career_matches')
            ->has('analysis.overall_readiness')
        );
});

it('requires authentication to export career fit PDF', function () {
    $response = $this->get('/career-fit/export/pdf');

    $response->assertRedirect('/login');
});

it('returns 400 when attempting to export PDF without completed assessments', function () {
    $response = $this->actingAs($this->user)->get('/career-fit/export/pdf');

    $response->assertStatus(400);
});

it('exports career fit PDF successfully when all assessments completed', function () {
    Storage::fake('public');

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

    // Add responses
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

    $response = $this->actingAs($this->user)->get('/career-fit/export/pdf');

    $response->assertOk()
        ->assertDownload()
        ->assertHeader('content-type', 'application/pdf');
});

it('shows correct assessment completion status', function () {
    // Complete only RIASEC
    UserAssessmentAttempt::factory()->create([
        'user_id' => $this->user->id,
        'assessment_type_id' => $this->riasecType->id,
        'completed_at' => now(),
    ]);

    $response = $this->actingAs($this->user)->get('/career-fit');

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Assessments/CareerFit')
            ->where('hasRequiredAssessments', false)
            ->has('requiredAssessments.riasec', fn ($riasec) => $riasec
                ->where('completed', true)
                ->etc()
            )
            ->has('requiredAssessments.skills', fn ($skills) => $skills
                ->where('completed', false)
                ->etc()
            )
            ->has('requiredAssessments.personality', fn ($personality) => $personality
                ->where('completed', false)
                ->etc()
            )
        );
});
