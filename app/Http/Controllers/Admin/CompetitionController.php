<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CompetitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): InertiaResponse
    {
        $query = Competition::query();

        // Search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('organizer', 'like', "%{$search}%");
            });
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        // Filter by status
        if ($request->filled('is_active')) {
            $query->where('is_active', $request->input('is_active'));
        }

        // Sorting
        $sortBy = $request->input('sort_by', 'competition_date');
        $sortOrder = $request->input('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $competitions = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Competitions/Index', [
            'competitions' => $competitions,
            'filters' => $request->only(['search', 'category', 'is_active', 'sort_by', 'sort_order']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): InertiaResponse
    {
        return Inertia::render('Admin/Competitions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'organizer' => 'nullable|string|max:255',
            'website_url' => 'nullable|url|max:500',
            'prize_amount' => 'nullable|numeric|min:0',
            'prize_description' => 'nullable|string',
            'eligibility_requirements' => 'nullable|array',
            'registration_start' => 'nullable|date',
            'registration_end' => 'nullable|date|after_or_equal:registration_start',
            'competition_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'format' => 'nullable|string|max:100',
            'image' => 'nullable|string|max:500',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        Competition::create($validated);

        return redirect()->route('admin.competitions.index')
            ->with('success', 'Competition created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Competition $competition): InertiaResponse
    {
        return Inertia::render('Admin/Competitions/Show', [
            'competition' => $competition,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Competition $competition): InertiaResponse
    {
        return Inertia::render('Admin/Competitions/Edit', [
            'competition' => $competition,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Competition $competition): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'organizer' => 'nullable|string|max:255',
            'website_url' => 'nullable|url|max:500',
            'prize_amount' => 'nullable|numeric|min:0',
            'prize_description' => 'nullable|string',
            'eligibility_requirements' => 'nullable|array',
            'registration_start' => 'nullable|date',
            'registration_end' => 'nullable|date|after_or_equal:registration_start',
            'competition_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'format' => 'nullable|string|max:100',
            'image' => 'nullable|string|max:500',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $competition->update($validated);

        return redirect()->route('admin.competitions.index')
            ->with('success', 'Competition updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Competition $competition): RedirectResponse
    {
        $competition->delete();

        return redirect()->route('admin.competitions.index')
            ->with('success', 'Competition deleted successfully.');
    }
}
