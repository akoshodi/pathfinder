<?php

namespace App\Http\Controllers;

use App\Models\AlumniAssociation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AlumniController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index']);
    }

    /**
     * Display a listing of alumni associations.
     */
    public function index(Request $request): Response
    {
        $associations = AlumniAssociation::query()
            ->with('university:id,name,slug,logo')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhereHas('university', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->where('is_active', true)
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Alumni/Index', [
            'associations' => $associations,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Display the alumni network page.
     */
    public function network(): Response
    {
        return Inertia::render('Alumni/Network');
    }

    /**
     * Display the mentorship page.
     */
    public function mentorship(): Response
    {
        return Inertia::render('Alumni/Mentorship');
    }
}
