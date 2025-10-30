<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\University;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class UniversityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): InertiaResponse
    {
        $query = University::with('location');

        // Search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by location
        if ($request->filled('location_id')) {
            $query->where('location_id', $request->input('location_id'));
        }

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        // Sorting
        $sortBy = $request->input('sort_by', 'name');
        $sortOrder = $request->input('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        $universities = $query->paginate(15)->withQueryString();

        $locations = Location::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Universities/Index', [
            'universities' => $universities,
            'locations' => $locations,
            'filters' => $request->only(['search', 'location_id', 'type', 'sort_by', 'sort_order']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): InertiaResponse
    {
        $locations = Location::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Universities/Create', [
            'locations' => $locations,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location_id' => 'required|exists:locations,id',
            'type' => 'required|string|in:university,college,institute,school',
            'website' => 'nullable|url|max:255',
            'logo_url' => 'nullable|url|max:500',
            'established_year' => 'nullable|integer|min:1800|max:'.date('Y'),
            'ranking' => 'nullable|integer|min:1',
            'is_featured' => 'boolean',
        ]);

        University::create($validated);

        return redirect()->route('admin.universities.index')
            ->with('success', 'University created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(University $university): InertiaResponse
    {
        $university->load(['location', 'programs', 'courses']);

        return Inertia::render('Admin/Universities/Show', [
            'university' => $university,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(University $university): InertiaResponse
    {
        $locations = Location::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Universities/Edit', [
            'university' => $university,
            'locations' => $locations,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, University $university): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location_id' => 'required|exists:locations,id',
            'type' => 'required|string|in:university,college,institute,school',
            'website' => 'nullable|url|max:255',
            'logo_url' => 'nullable|url|max:500',
            'established_year' => 'nullable|integer|min:1800|max:'.date('Y'),
            'ranking' => 'nullable|integer|min:1',
            'is_featured' => 'boolean',
        ]);

        $university->update($validated);

        return redirect()->route('admin.universities.index')
            ->with('success', 'University updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(University $university): RedirectResponse
    {
        $university->delete();

        return redirect()->route('admin.universities.index')
            ->with('success', 'University deleted successfully.');
    }
}
