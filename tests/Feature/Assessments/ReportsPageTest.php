<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

it('loads the assessment reports page for admins', function () {
    $user = User::factory()->create();
    Role::findOrCreate('admin');
    $user->assignRole('admin');

    $this->actingAs($user);

    $response = $this->get('/admin/assessments/reports');

    $response->assertSuccessful();
});
