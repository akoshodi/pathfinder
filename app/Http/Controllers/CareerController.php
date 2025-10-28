<?php

namespace App\Http\Controllers;

use App\Models\Career;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CareerController extends Controller
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
        $careers = Career::query()
            ->with('company:id,name,slug,logo')
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->type, function ($query, $type) {
                $query->where('type', $type);
            })
            ->when($request->experience_level, function ($query, $level) {
                $query->where('experience_level', $level);
            })
            ->when($request->is_remote, function ($query) {
                $query->where('is_remote', true);
            })
            ->where('is_active', true)
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Careers/Index', [
            'careers' => $careers,
            'filters' => $request->only(['search', 'type', 'experience_level', 'is_remote']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Career $career): Response
    {
        $career->load('company');

        return Inertia::render('Careers/Show', [
            'career' => [
                'id' => $career->id,
                'title' => $career->title,
                'slug' => $career->slug,
                'description' => $career->description,
                'type' => $career->type,
                'location' => $career->location,
                'is_remote' => $career->is_remote,
                'salary_range' => $career->salary_range,
                'experience_level' => $career->experience_level,
                'requirements' => $career->requirements,
                'responsibilities' => $career->responsibilities,
                'benefits' => $career->benefits,
                'skills_required' => $career->skills_required,
                'application_url' => $career->application_url,
                'deadline' => $career->deadline?->format('Y-m-d'),
                'company' => $career->company,
            ],
        ]);
    }
}
