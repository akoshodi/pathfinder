<?php

it('shows notable alumni from the database on university page', function () {
    // Create a university
    $university = \App\Models\University::query()->create([
        'name' => 'Test University',
        'slug' => 'test-university',
        'location' => 'Test City, TS',
        'city' => 'Test City',
        'state' => 'TS',
        'type' => 'Public',
        'ranking' => 1,
        'is_active' => true,
    ]);

    // Create a notable alumnus
    $alumnus = \App\Models\NotableAlumnus::query()->create([
        'university_id' => $university->id,
        'name' => 'Ada Lovelace',
        'title' => 'Pioneer of Computing',
    ]);

    $response = $this->get("/universities/{$university->slug}");

    $response->assertSuccessful();
    $response->assertSee('Ada Lovelace');
});
