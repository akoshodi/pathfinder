<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        $query = University::query();

        // Search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        // Filter by location
        if ($request->filled('location')) {
            $query->where('location', $request->input('location'));
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

        return Inertia::render('Admin/Universities/Index', [
            'universities' => $universities,
            'filters' => $request->only(['search', 'location', 'type', 'sort_by', 'sort_order']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): InertiaResponse
    {
        return Inertia::render('Admin/Universities/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:universities',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'type' => 'required|string|in:university,college,institute,school',
            'website' => 'nullable|url|max:255',
            'logo_url' => 'nullable|url|max:500',
            'established_year' => 'nullable|integer|min:1800|max:'.date('Y'),
            'ranking' => 'nullable|integer|min:1',
            'is_featured' => 'boolean',
        ]);

        // Generate slug from name if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);
        }

        University::create($validated);

        return redirect()->route('admin.universities.index')
            ->with('success', 'University created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(University $university): InertiaResponse
    {
        return Inertia::render('Admin/Universities/Show', [
            'university' => $university,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(University $university): InertiaResponse
    {
        return Inertia::render('Admin/Universities/Edit', [
            'university' => $university,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, University $university): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:universities,slug,'.$university->id,
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'type' => 'required|string|in:university,college,institute,school',
            'website' => 'nullable|url|max:255',
            'logo_url' => 'nullable|url|max:500',
            'established_year' => 'nullable|integer|min:1800|max:'.date('Y'),
            'ranking' => 'nullable|integer|min:1',
            'is_featured' => 'boolean',
        ]);

        // Generate slug from name if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);
        }

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
