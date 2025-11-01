<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('loads super admin dashboard inertia component', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $this->get('/admin/super')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Admin/SuperAdmin/Dashboard'));
});

it('loads institution dashboard inertia component', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $this->get('/admin/institution')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Admin/Institution/Dashboard'));
});

it('loads student dashboard inertia component', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $this->get('/admin/student')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Admin/Student/Dashboard'));
});

it('loads SIS feature inertia component', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $this->get('/admin/settings/sis-feature')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Admin/Settings/SISFeatureName'));
});
