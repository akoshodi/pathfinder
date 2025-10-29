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

it('navigates blog index to show and supports pagination', function () {
    BlogPost::factory()->count(15)->create([
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);

    $index = $this->get('/blog');
    $index->assertSuccessful();

    // Page 2 should also load
    $page2 = $this->get('/blog?page=2');
    $page2->assertSuccessful();

    $post = BlogPost::query()->where('status', 'published')->first();
    $show = $this->get("/blog/{$post->slug}");
    $show->assertSuccessful();
});

it('navigates resources index with filters and pagination to show', function () {
    // Ensure active resources of different types
    Resource::factory()->count(12)->create([
        'is_active' => true,
        'type' => 'article',
    ]);
    Resource::factory()->count(6)->create([
        'is_active' => true,
        'type' => 'video',
    ]);

    $index = $this->get('/resources');
    $index->assertSuccessful();

    $filtered = $this->get('/resources?type=article');
    $filtered->assertSuccessful();

    $page2 = $this->get('/resources?type=article&page=2');
    $page2->assertSuccessful();

    $resource = Resource::query()->where('is_active', true)->first();
    $show = $this->get("/resources/{$resource->slug}");
    $show->assertSuccessful();
});

it('navigates links index to show', function () {
    $link = Link::factory()->create();

    $index = $this->get('/links');
    $index->assertSuccessful();

    $show = $this->get("/links/{$link->id}");
    $show->assertSuccessful();
});

it('navigates occupations index with query to show', function () {
    $occupation = OnetOccupation::factory()->create([
        'title' => 'Software Developer',
    ]);

    $index = $this->get('/occupations?search=Software');
    $index->assertSuccessful();

    $show = $this->get('/occupations/'.str_replace('.', '-', $occupation->onetsoc_code));
    $show->assertSuccessful();
});

it('navigates companies, courses, universities, locations, marketplace, competitions', function () {
    $company = Company::factory()->create();
    $course = Course::factory()->create();
    $university = University::factory()->create();
    $location = Location::factory()->create();
    $market = MarketplaceItem::factory()->create();
    $competition = Competition::factory()->create();

    $this->get('/companies')->assertSuccessful();
    $this->get("/companies/{$company->slug}")->assertSuccessful();

    $this->get('/courses')->assertSuccessful();
    $this->get("/courses/{$course->slug}")->assertSuccessful();

    $this->get('/universities')->assertSuccessful();
    $this->get("/universities/{$university->slug}")->assertSuccessful();

    $this->get('/locations')->assertSuccessful();
    $this->get("/locations/{$location->slug}")->assertSuccessful();

    $this->get('/marketplace')->assertSuccessful();
    $this->get("/marketplace/{$market->slug}")->assertSuccessful();

    $this->get('/competitions')->assertSuccessful();
    $this->get("/competitions/{$competition->slug}")->assertSuccessful();
});
