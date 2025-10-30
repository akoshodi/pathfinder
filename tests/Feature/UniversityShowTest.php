<?php

use App\Models\Program;
use App\Models\University;
use Illuminate\Support\Str;

it('shows a university details page', function () {
    // Arrange: create a minimal valid university
    $name = 'Test University';
    $uni = University::query()->create([
        'name' => $name,
        'slug' => Str::slug($name),
        'location' => 'United States',
        'type' => 'Public',
        'is_active' => true,
    ]);

    // Act
    $response = $this->get("/universities/{$uni->slug}");

    // Assert
    $response->assertSuccessful();
});

it('groups programs by college on the show page', function () {
    $name = 'Grouped Programs University';
    $uni = University::create([
        'name' => $name,
        'slug' => Str::slug($name),
        'location' => 'United States',
        'city' => 'Test City',
        'state' => 'TS',
        'type' => 'Public',
        'ranking' => 100,
        'is_active' => true,
    ]);

    $prog1 = Program::create([
        'name' => 'Test Engineering',
        'slug' => Str::slug('Test Engineering'),
        'category' => 'STEM',
        'description' => 'Desc',
    ]);
    $prog2 = Program::create([
        'name' => 'Test Business',
        'slug' => Str::slug('Test Business'),
        'category' => 'Business',
        'description' => 'Desc',
    ]);

    $uni->programsRelation()->attach([
        $prog1->id => ['college' => 'School of Engineering'],
        $prog2->id => ['college' => 'School of Business'],
    ]);

    $response = $this->get("/universities/{$uni->slug}");
    $response->assertSuccessful();

    // Controller returns Inertia::render('PublicPage') with nested component/props
    $pageProps = $response->viewData('page')['props'] ?? [];
    expect($pageProps)->toHaveKey('component');
    expect($pageProps['component'])->toBe('Universities/Show');

    $propsData = $pageProps['props'] ?? [];
    expect($propsData)->toHaveKey('university');

    $groups = data_get($propsData, 'university.programs_by_college');
    expect($groups)->toBeArray();
    expect(collect($groups)->pluck('college')->all())
        ->toContain('School of Engineering')
        ->toContain('School of Business');
});
