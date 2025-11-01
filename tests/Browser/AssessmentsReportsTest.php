<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

it('renders assessment reports without JS errors', function () {
    $user = User::factory()->create();
    Role::findOrCreate('admin');
    $user->assignRole('admin');
    $this->actingAs($user);

    $page = visit('/admin/assessments/reports');

    $page->assertSee('Assessment Reports')
        ->assertNoJavascriptErrors()
        ->assertNoConsoleLogs()
        ->assertPresent('[data-testid="reports-table"]');
});
