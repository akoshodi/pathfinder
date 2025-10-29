<?php

use App\Models\ComparisonItem;
use App\Models\University;
use App\Models\User;

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

it('allows authenticated users to remove their own comparison items', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $university = University::factory()->create([
        'is_active' => true,
    ]);

    $item = ComparisonItem::create([
        'user_id' => $user->id,
        'comparable_type' => University::class,
        'comparable_id' => $university->id,
        'position' => 1,
    ]);

    $otherItem = ComparisonItem::create([
        'user_id' => $otherUser->id,
        'comparable_type' => University::class,
        'comparable_id' => $university->id,
        'position' => 1,
    ]);

    $this->actingAs($user);

    // Can delete own item
    $this->delete("/comparison/{$item->id}")->assertRedirect();
    expect(ComparisonItem::find($item->id))->toBeNull();

    // Cannot delete other user's item
    $this->delete("/comparison/{$otherItem->id}")->assertForbidden();
    expect(ComparisonItem::find($otherItem->id))->not->toBeNull();
});
