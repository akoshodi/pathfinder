<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
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
        $courses = Course::query()
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('provider', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->when($request->level, function ($query, $level) {
                $query->where('level', $level);
            })
            ->where('is_active', true)
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
            'filters' => $request->only(['search', 'category', 'level']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course): Response
    {
        $course->load('universities');

        return Inertia::render('Courses/Show', [
            'course' => $course,
        ]);
    }
}
