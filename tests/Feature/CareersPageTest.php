<?php

it('loads the careers index page', function () {
    $response = $this->get('/careers');

    $response->assertSuccessful();
});
