<?php

use App\Models\University;

it('renders public compare for universities via URL params', function () {
    $u1 = University::factory()->create([
        'name' => 'Alpha University',
        'slug' => 'alpha-uni',
        'location' => 'Alpha City, CA',
        'city' => 'Alpha City',
        'state' => 'CA',
    ]);

    $u2 = University::factory()->create([
        'name' => 'Beta University',
        'slug' => 'beta-uni',
        'location' => 'Beta City, NY',
        'city' => 'Beta City',
        'state' => 'NY',
    ]);

    $response = $this->get('/compare?universities=alpha-uni-vs-beta-uni');

    $response->assertSuccessful();
    $response->assertSee('Alpha University');
    $response->assertSee('Beta University');
});
