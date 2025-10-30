<?php

use App\Models\AssessmentType;
use App\Models\User;
use App\Models\UserAssessmentAttempt;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->has('user')
            ->has('stats')
            ->where('isAdmin', false)
            ->where('admin', null)
            ->has('recent')
            ->has('recentResult')
        );
});

test('admins see admin aggregates on dashboard', function () {
    $this->actingAs($admin = User::factory()->create());
    $admin->assignRole('super-admin');

    $this->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('isAdmin', true)
            ->has('admin.totals')
            ->has('admin.assessments')
            ->has('admin.recentAttempts')
        );
});

test('shows resume recent attempt and recent result for regular users when available', function () {
    $this->actingAs($user = User::factory()->create());

    $type = AssessmentType::create([
        'name' => 'RIASEC',
        'slug' => 'riasec',
        'description' => 'desc',
        'category' => 'career_interest',
        'question_count' => 10,
        'is_active' => true,
    ]);

    // In-progress attempt
    UserAssessmentAttempt::create([
        'user_id' => $user->id,
        'assessment_type_id' => $type->id,
        'session_id' => 'sess1',
        'started_at' => now()->subMinutes(10),
        'completed_at' => null,
    ]);

    // Completed attempt (more recent)
    UserAssessmentAttempt::create([
        'user_id' => $user->id,
        'assessment_type_id' => $type->id,
        'session_id' => 'sess2',
        'started_at' => now()->subMinutes(8),
        'completed_at' => now()->subMinutes(2),
    ]);

    $this->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('isAdmin', false)
            ->has('recent')
            ->has('recentResult')
        );
});
