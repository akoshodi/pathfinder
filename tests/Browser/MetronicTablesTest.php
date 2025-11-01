<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

it('shows table view on desktop for super admin dashboard', function () {
    $user = User::factory()->create();
    Role::findOrCreate('super-admin');
    $user->assignRole('super-admin');

    $this->actingAs($user);

    $page = visit('/admin/super');

    $page->assertSee('Super Admin')
        ->assertNoJavascriptErrors()
        ->assertNoConsoleLogs()
        ->assertPresent('[data-testid="datatable-table"]');
});
