<?php

use App\Models\Link;
use App\Models\LinkVote;
use App\Models\User;

uses(\Tests\TestCase::class)->in('Feature');

it('shows links index', function () {
    $this->get('/links')->assertSuccessful();
});

it('requires auth to create a link', function () {
    $this->post('/links', [
        'title' => 'Test',
        'url' => 'https://example.com',
    ])->assertRedirect('/login');
});

it('allows an authenticated user to create a link', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post('/links', [
        'title' => 'Example',
        'url' => 'https://example.com',
        'description' => 'Desc',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('links', [
        'title' => 'Example',
        'url' => 'https://example.com',
        'user_id' => $user->id,
    ]);
});

it('toggles vote for a link', function () {
    $user = User::factory()->create();
    $link = Link::factory()->create();

    $this->actingAs($user);

    $this->post("/links/{$link->id}/vote")->assertRedirect();
    expect(LinkVote::where('link_id', $link->id)->where('user_id', $user->id)->exists())->toBeTrue();

    $this->post("/links/{$link->id}/vote")->assertRedirect();
    expect(LinkVote::where('link_id', $link->id)->where('user_id', $user->id)->exists())->toBeFalse();
});

it('requires auth to comment', function () {
    $link = Link::factory()->create();

    $this->post("/links/{$link->id}/comments", [
        'body' => 'Hello',
    ])->assertRedirect('/login');
});

it('allows an authenticated user to comment', function () {
    $user = User::factory()->create();
    $link = Link::factory()->create();

    $this->actingAs($user);

    $this->post("/links/{$link->id}/comments", [
        'body' => 'Hello world',
    ])->assertRedirect();

    $this->assertDatabaseHas('link_comments', [
        'link_id' => $link->id,
        'user_id' => $user->id,
        'body' => 'Hello world',
    ]);
});

it('allows replying to a comment (threaded)', function () {
    $user = User::factory()->create();
    $link = Link::factory()->create();
    $parent = \App\Models\LinkComment::factory()->create(['link_id' => $link->id]);

    $this->actingAs($user);

    $this->post("/links/{$link->id}/comments", [
        'body' => 'Reply here',
        'parent_id' => $parent->id,
    ])->assertRedirect();

    $this->assertDatabaseHas('link_comments', [
        'link_id' => $link->id,
        'user_id' => $user->id,
        'parent_id' => $parent->id,
        'body' => 'Reply here',
    ]);
});
