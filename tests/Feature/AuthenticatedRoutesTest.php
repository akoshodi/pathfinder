<?php

use App\Models\User;
use function Pest\Laravel\actingAs;

it('serves authenticated routes successfully for a verified user', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    actingAs($user);

    // Core authenticated pages
    $this->get('/dashboard')->assertOk();
    $this->get('/my-saved-items')->assertOk();

    // Settings pages
    $this->get('/settings/profile')->assertOk();
    $this->get('/settings/password')->assertOk();
    $this->get('/settings/appearance')->assertOk();
    $this->get('/settings/two-factor')->assertOk();
});

it('serves alumni-only pages when user has alumni role', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    // Ensure role exists and assign
    $roleClass = class_exists(\Spatie\Permission\Models\Role::class)
        ? \Spatie\Permission\Models\Role::class
        : null;

    if ($roleClass !== null && !$roleClass::where('name', 'alumni')->exists()) {
        $roleClass::create(['name' => 'alumni']);
    }

    if (method_exists($user, 'assignRole')) {
        $user->assignRole('alumni');
    }

    actingAs($user);

    $this->get('/alumni/network')->assertOk();
    $this->get('/alumni/mentorship')->assertOk();
});
