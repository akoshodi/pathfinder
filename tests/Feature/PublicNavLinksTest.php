<?php

use Illuminate\Support\Str;

it('home page nav links are valid (public context)', function () {
    $response = $this->get('/');
    $html = $response->getContent();

    // Extract hrefs from anchor tags
    preg_match_all('/<a[^>]+href="([^"]+)"/i', $html, $matches);
    $hrefs = collect($matches[1] ?? [])
        ->filter(fn ($href) => is_string($href))
        ->map(fn ($href) => strtok($href, '#')) // strip hashes
        ->unique()
        ->filter(function ($href) {
            if (!is_string($href)) { return false; }
            if ($href === '' || $href === '/' || $href[0] !== '/') { return false; }
            if (Str::startsWith($href, ['/storage', '/build'])) { return false; }
            return true;
        })
        ->values();

    foreach ($hrefs as $href) {
        $res = $this->get($href);
        // Accept any non-error (2xx or 3xx redirects to auth pages)
        expect($res->getStatusCode())->toBeGreaterThanOrEqual(200);
        expect($res->getStatusCode())->toBeLessThan(400);
    }
});
