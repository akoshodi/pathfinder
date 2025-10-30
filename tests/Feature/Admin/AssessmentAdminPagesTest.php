<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

it('redirects guests to login for admin pages', function () {
    $this->get('/admin/assessments/attempts')->assertRedirect();
    $this->get('/admin/assessments/reports')->assertRedirect();
});

it('forbids non-admin users from admin pages', function () {
    $this->actingAs(User::factory()->create());

    $this->get('/admin/assessments/attempts')->assertForbidden();
    $this->get('/admin/assessments/reports')->assertForbidden();
});

it('allows admins to view attempts and reports pages', function () {
    // Ensure the admin role exists
    Role::findOrCreate('admin');

    $this->actingAs($admin = User::factory()->create());
    $admin->assignRole('admin');

    $this->get('/admin/assessments/attempts')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Assessments/Attempts')
            ->has('attempts')
            ->has('filters'));

    $this->get('/admin/assessments/reports')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Assessments/Reports')
            ->has('reports')
            ->has('filters'));
});
