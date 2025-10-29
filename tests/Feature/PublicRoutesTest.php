<?php

use function Pest\Laravel\get;

it('serves public index routes successfully', function (string $uri) {
    get($uri)->assertSuccessful();
})->with([
    '/',
    '/universities',
    '/courses',
    '/companies',
    '/careers',
    '/occupations',
    '/blog',
    '/alumni',
    '/links',
    '/resources',
    '/locations',
    '/marketplace',
    '/competitions',
    '/compare',
    '/about',
    '/about/team',
    '/about/careers',
    '/about/press',
    '/about/data',
    '/about/partnerships',
    '/about/contact',
    '/help',
    '/terms',
    '/privacy',
    '/accessibility',
    '/sitemap',
    '/recommendations',
    '/course-eligibility',
    '/claim-school',
]);
