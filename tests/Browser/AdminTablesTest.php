<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

it('shows table view on desktop for universities index', function () {
    $user = User::factory()->create();
    Role::findOrCreate('admin');
    $user->assignRole('admin');
    $this->actingAs($user);

    $page = visit('/admin/universities');

    $page->assertSee('Universities')
        ->assertNoJavascriptErrors()
        ->assertNoConsoleLogs()
        // Table view should be visible on desktop viewport
        ->assertPresent('[data-testid="datatable-table"]')
        ->assertNotPresent('[data-testid="datatable-cards"]');
});
