<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

it('returns universities index for authenticated user', function () {
    $user = User::factory()->create();
    // Ensure the user has permission to access admin pages
    Role::findOrCreate('admin');
    $user->assignRole('admin');

    $response = test()->actingAs($user)->get('/admin/universities');

    $response->assertSuccessful();
});
