<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    public function show(Program $program): Response
    {
        $program->load(['universities' => function ($q) {
            $q->select('universities.id', 'name', 'slug', 'city', 'state', 'type', 'ranking');
        }]);

        return Inertia::render('PublicPage', [
            'component' => 'Programs/Show',
            'props' => [
                'program' => [
                    'id' => $program->id,
                    'name' => $program->name,
                    'slug' => $program->slug,
                    'category' => $program->category,
                    'description' => $program->description,
                    'universities' => $program->universities->map(fn ($u) => [
                        'id' => $u->id,
                        'name' => $u->name,
                        'slug' => $u->slug,
                        'city' => $u->city,
                        'state' => $u->state,
                        'type' => $u->type,
                        'ranking' => $u->ranking,
                    ]),
                ],
            ],
        ]);
    }
}
