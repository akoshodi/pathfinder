<?php

use App\Models\BlogPost;
use App\Models\Company;
use App\Models\Competition;
use App\Models\Course;
use App\Models\Link;
use App\Models\Location;
use App\Models\MarketplaceItem;
use App\Models\OnetOccupation;
use App\Models\Resource;
use App\Models\University;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class)->in('Browser');

beforeEach(function () {
    if (! (bool) env('BROWSER_TESTS', false)) {
        $this->markTestSkipped('Browser tests disabled (set BROWSER_TESTS=1 to enable).');
    }
});

it('smoke tests public pages for JS/console errors', function () {
    // Seed minimal content for visibility
    BlogPost::factory()->create([
        'status' => 'published',
        'published_at' => now()->subDay(),
        'title' => 'Test Blog Title',
    ]);
    Resource::factory()->create([
        'is_active' => true,
        'type' => 'article',
        'title' => 'Test Resource Title',
    ]);

    $pages = visit(['/', '/blog', '/resources', '/occupations', '/companies', '/courses', '/universities', '/links']);

    $pages->assertNoJavascriptErrors()->assertNoConsoleLogs();
});

it('clicks through from blog index to show', function () {
    $post = BlogPost::factory()->create([
        'status' => 'published',
        'published_at' => now()->subDay(),
        'title' => 'Clickable Blog Post',
    ]);

    $page = visit('/blog');

    $page->assertSee('Clickable Blog Post')
        ->assertNoJavascriptErrors()
        ->click('Clickable Blog Post')
        ->assertSee('Clickable Blog Post');
});

it('clicks through from links index to show', function () {
    $link = Link::factory()->create([
        'title' => 'Clickable Link Title',
    ]);

    $page = visit('/links');

    $page->assertSee('Clickable Link Title')
        ->assertNoJavascriptErrors()
        ->click('Clickable Link Title')
        ->assertSee('Clickable Link Title');
});

it('clicks through from resources index to show', function () {
    Resource::factory()->create([
        'is_active' => true,
        'type' => 'article',
        'title' => 'Clickable Resource Title',
    ]);

    $page = visit('/resources');

    $page->assertSee('Clickable Resource Title')
        ->assertNoJavascriptErrors()
        ->click('Clickable Resource Title')
        ->assertSee('Clickable Resource Title');
});

it('clicks through from companies index to show', function () {
    Company::factory()->create([
        'name' => 'Clickable Company Name',
    ]);

    $page = visit('/companies');
    $page->assertSee('Clickable Company Name')
        ->assertNoJavascriptErrors()
        ->click('Clickable Company Name')
        ->assertSee('Clickable Company Name');
});

it('clicks through from courses index to show', function () {
    Course::factory()->create([
        'title' => 'Clickable Course Title',
    ]);

    $page = visit('/courses');
    $page->assertSee('Clickable Course Title')
        ->assertNoJavascriptErrors()
        ->click('Clickable Course Title')
        ->assertSee('Clickable Course Title');
});

it('clicks through from universities index to show', function () {
    University::factory()->create([
        'name' => 'Clickable University',
    ]);

    $page = visit('/universities');
    $page->assertSee('Clickable University')
        ->assertNoJavascriptErrors()
        ->click('Clickable University')
        ->assertSee('Clickable University');
});

it('clicks through from locations index to show', function () {
    Location::factory()->create([
        'name' => 'Clickable Location',
    ]);

    $page = visit('/locations');
    $page->assertSee('Clickable Location')
        ->assertNoJavascriptErrors()
        ->click('Clickable Location')
        ->assertSee('Clickable Location');
});

it('clicks through from marketplace index to show', function () {
    MarketplaceItem::factory()->create([
        'title' => 'Clickable Item',
        'is_active' => true,
    ]);

    $page = visit('/marketplace');
    $page->assertSee('Clickable Item')
        ->assertNoJavascriptErrors()
        ->click('Clickable Item')
        ->assertSee('Clickable Item');
});

it('clicks through from competitions index to show', function () {
    Competition::factory()->create([
        'title' => 'Clickable Competition',
        'is_active' => true,
    ]);

    $page = visit('/competitions');
    $page->assertSee('Clickable Competition')
        ->assertNoJavascriptErrors()
        ->click('Clickable Competition')
        ->assertSee('Clickable Competition');
});

it('clicks through from occupations index to show', function () {
    OnetOccupation::factory()->create([
        'title' => 'Clickable Occupation',
    ]);

    $page = visit('/occupations');
    $page->assertSee('Clickable Occupation')
        ->assertNoJavascriptErrors()
        ->click('Clickable Occupation')
        ->assertSee('Clickable Occupation');
});
