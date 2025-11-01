<?php

use App\Models\University;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class)->in('Browser');

beforeEach(function () {
    if (! (bool) env('BROWSER_TESTS', false)) {
        $this->markTestSkipped('Browser tests disabled (set BROWSER_TESTS=1 to enable).');
    }
});

it('navigates to university profile from compare page', function () {
    $u1 = University::factory()->create(['name' => 'Alpha University']);
    $u2 = University::factory()->create(['name' => 'Beta University']);

    $url = "/compare?universities={$u1->slug}-vs-{$u2->slug}";

    $page = visit($url);

    $page->assertSee('View Full Profile')
        ->assertSee('Alpha University')
        ->click('View Full Profile →')
        ->assertSee('Alpha University');
});

it('navigates to company profile from compare page', function () {
    $c1 = \App\Models\Company::factory()->create(['name' => 'Acme Corp']);
    $c2 = \App\Models\Company::factory()->create(['name' => 'Globex Inc']);

    $url = "/compare?companies={$c1->slug}-vs-{$c2->slug}";

    $page = visit($url);

    $page->assertSee('View Full Profile')
        ->assertSee('Acme Corp')
        ->click('View Full Profile →')
        ->assertSee('Acme Corp');
});
