<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;
use App\Services\Assessment\SkillScoringService;

use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

it('calculates skill proficiencies and labels', function () {
    seed(Database\Seeders\AssessmentTypeSeeder::class);
    seed(Database\Seeders\SkillsQuestionSeeder::class);

    $skillsType = AssessmentType::where('slug', 'skills')->firstOrFail();

    // Create an anonymous attempt
    $attempt = UserAssessmentAttempt::create([
        'user_id' => null,
        'session_id' => 'test-session',
        'assessment_type_id' => $skillsType->id,
        'started_at' => now(),
        'completed_at' => now(),
    ]);

    // Answer 1 question per domain with high rating (5)
    $domainsAnswered = [];
    $questions = AssessmentQuestion::where('assessment_type_id', $skillsType->id)
        ->orderBy('order')
        ->get();

    foreach ($questions as $q) {
        if (! isset($domainsAnswered[$q->category])) {
            UserAssessmentResponse::create([
                'attempt_id' => $attempt->id,
                'question_id' => $q->id,
                'response_value' => 5,
                'response_score' => 5,
                'time_spent_seconds' => 1,
            ]);
            $domainsAnswered[$q->category] = true;
        }
        if (count($domainsAnswered) >= 5) {
            break;
        }
    }

    // Calculate
    $service = new SkillScoringService();
    $service->calculateScores($attempt);

    $attempt->refresh();

    // Verify normalized scores exist for all answered domains and are high
    $normalized = $attempt->normalized_scores;
    expect($normalized)->not->toBeNull();
    foreach (array_keys($domainsAnswered) as $domain) {
        expect($normalized[$domain] ?? 0)->toBeGreaterThanOrEqual(80);
    }

    // Verify proficiencies persisted with appropriate labels
    $proficiencies = $attempt->skillProficiencies;
    expect($proficiencies)->toHaveCount(count($domainsAnswered));
    foreach ($proficiencies as $p) {
        expect($p->proficiency_level)->toBe(5);
        expect($p->proficiency_label)->toBeIn(['Advanced', 'Expert']);
    }
});
