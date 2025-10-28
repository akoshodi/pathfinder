<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $companies = Company::query()
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->when($request->is_partner, function ($query) {
                $query->where('is_partner', true);
            })
            ->where('is_active', true)
            ->latest()
            ->paginate(20)
            ->withQueryString()
            ->through(fn ($company) => [
                'id' => $company->id,
                'name' => $company->name,
                'slug' => $company->slug,
                'description' => $company->description,
                'logo' => $company->logo,
                'category' => $company->category,
                'location' => $company->location,
                'city' => $company->city,
                'state' => $company->state,
                'employees' => $company->employees,
                'internships_count' => $company->internships_count,
                'jobs_count' => $company->jobs_count,
                'is_partner' => $company->is_partner,
                'is_featured' => $company->is_featured,
            ]);

        return Inertia::render('Companies/Index', [
            'companies' => $companies,
            'filters' => $request->only(['search', 'category', 'is_partner']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company): Response
    {
        $company->load(['careers' => function ($query) {
            $query->where('is_active', true)->latest()->limit(10);
        }]);

        return Inertia::render('Companies/Show', [
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
                'slug' => $company->slug,
                'description' => $company->description,
                'logo' => $company->logo,
                'cover_image' => $company->cover_image,
                'category' => $company->category,
                'location' => $company->location,
                'city' => $company->city,
                'state' => $company->state,
                'country' => $company->country,
                'employees' => $company->employees,
                'website' => $company->website,
                'email' => $company->email,
                'phone' => $company->phone,
                'internships_count' => $company->internships_count,
                'jobs_count' => $company->jobs_count,
                'is_partner' => $company->is_partner,
                'benefits' => $company->benefits,
                'values' => $company->values,
            ],
            'careers' => $company->careers->map(fn ($c) => [
                'id' => $c->id,
                'title' => $c->title,
                'slug' => $c->slug,
                'type' => $c->type,
                'description' => $c->description,
                'location' => $c->location,
                'experience_level' => $c->experience_level,
                'is_remote' => (bool) $c->is_remote,
                'posted_at' => optional($c->created_at)->diffForHumans(),
            ]),
        ]);
    }
}
