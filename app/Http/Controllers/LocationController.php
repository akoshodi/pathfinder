<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Location::query();

        // Search by name, city, state, or country
        if ($request->has('search') && $request->search !== '') {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%'.$request->search.'%')
                    ->orWhere('city', 'like', '%'.$request->search.'%')
                    ->orWhere('state', 'like', '%'.$request->search.'%')
                    ->orWhere('country', 'like', '%'.$request->search.'%');
            });
        }

        // Filter by country
        if ($request->has('country') && $request->country !== '') {
            $query->where('country', $request->country);
        }

        // Sort by featured first, then by universities count
        $query->orderBy('is_featured', 'desc')
            ->orderBy('universities_count', 'desc');

        $locations = $query->paginate(12)->withQueryString();

        // Get distinct countries for filter
        $countries = Location::query()
            ->distinct()
            ->pluck('country')
            ->sort()
            ->values();

        return Inertia::render('Locations/Index', [
            'locations' => $locations,
            'filters' => $request->only(['search', 'country']),
            'countries' => $countries,
        ]);
    }

    public function show(Location $location): Response
    {
        // Load universities and companies for this location
        $universities = $location->universities()
            ->select('id', 'name', 'slug', 'location', 'ranking')
            ->limit(12)
            ->get();

        $companies = $location->companies()
            ->select('id', 'name', 'slug', 'industry')
            ->limit(12)
            ->get();

        return Inertia::render('Locations/Show', [
            'location' => $location,
            'universities' => $universities,
            'companies' => $companies,
        ]);
    }
}
