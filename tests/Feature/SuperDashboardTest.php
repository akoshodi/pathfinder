<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

it('returns super admin dashboard for super-admin user', function () {
    $user = User::factory()->create();
    Role::findOrCreate('super-admin');
    $user->assignRole('super-admin');

    $response = test()->actingAs($user)->get('/admin/super');

    $response->assertSuccessful();
});
