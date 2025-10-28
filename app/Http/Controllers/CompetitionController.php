<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompetitionController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Competition::where('is_active', true)
            ->orderBy('is_featured', 'desc')
            ->orderBy('competition_date', 'asc');

        // Filter by category
        if ($request->has('category') && $request->category !== '') {
            $query->where('category', $request->category);
        }

        // Filter by format
        if ($request->has('format') && $request->format !== '') {
            $query->where('format', $request->format);
        }

        // Search by title or description
        if ($request->has('search') && $request->search !== '') {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%'.$request->search.'%')
                    ->orWhere('description', 'like', '%'.$request->search.'%')
                    ->orWhere('organizer', 'like', '%'.$request->search.'%');
            });
        }

        $competitions = $query->paginate(12)->withQueryString();

        return Inertia::render('Competitions/Index', [
            'competitions' => $competitions,
            'filters' => $request->only(['category', 'format', 'search']),
        ]);
    }

    public function show(Competition $competition): Response
    {
        $relatedCompetitions = Competition::where('is_active', true)
            ->where('id', '!=', $competition->id)
            ->where('category', $competition->category)
            ->limit(4)
            ->get();

        return Inertia::render('Competitions/Show', [
            'competition' => $competition,
            'relatedCompetitions' => $relatedCompetitions,
        ]);
    }
}
