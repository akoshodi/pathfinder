<?php

it('loads the occupations index page', function () {
    $response = $this->get('/occupations');

    $response->assertSuccessful();
});
