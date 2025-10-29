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
    
    // Two-factor requires password confirmation - either confirm or expect redirect
    $response = $this->get('/settings/two-factor');
    // Accept either OK (if password recently confirmed) or redirect to password confirm
    expect($response->getStatusCode())->toBeIn([200, 302]);
});

it('serves alumni-only pages when user has alumni role', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    // Ensure role exists and assign using Spatie permissions
    if (class_exists(\Spatie\Permission\Models\Role::class)) {
        $role = \Spatie\Permission\Models\Role::firstOrCreate([
            'name' => 'alumni',
            'guard_name' => 'web'
        ]);
        $user->roles()->attach($role->id);
    }

    actingAs($user);

    $this->get('/alumni/network')->assertOk();
    $this->get('/alumni/mentorship')->assertOk();
});
