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
    '/blog',
    '/alumni',
    '/resources',
    '/locations',
    '/marketplace',
    '/competitions',
    '/about',
    '/help',
    '/terms',
    '/privacy',
    '/accessibility',
    '/sitemap',
    '/recommendations',
    '/course-eligibility',
    '/claim-school',
]);
