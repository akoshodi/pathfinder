<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AssessmentController extends Controller
{
    /**
     * Display a listing of the user's assessments.
     */
    public function index(): Response
    {
        $assessments = Assessment::query()
            ->where('user_id', auth()->id())
            ->latest()
            ->get()
            ->map(fn ($assessment) => [
                'id' => $assessment->id,
                'type' => $assessment->type,
                'score' => $assessment->score,
                'completed_at' => $assessment->completed_at?->format('M d, Y'),
                'results' => $assessment->results,
            ]);

        return Inertia::render('Assessments/Index', [
            'assessments' => $assessments,
        ]);
    }

    /**
     * Store a newly completed assessment.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required', 'in:interest,skills,career_fit'],
            'answers' => ['required', 'array'],
            'results' => ['nullable', 'array'],
            'score' => ['nullable', 'integer'],
            'recommendations' => ['nullable', 'array'],
        ]);

        $assessment = Assessment::create([
            'user_id' => auth()->id(),
            'type' => $validated['type'],
            'answers' => $validated['answers'],
            'results' => $validated['results'] ?? [],
            'score' => $validated['score'] ?? null,
            'recommendations' => $validated['recommendations'] ?? [],
            'completed_at' => now(),
        ]);

        return redirect()->route('assessments.show', $assessment);
    }

    /**
     * Display the specified assessment.
     */
    public function show(Assessment $assessment): Response
    {
        $this->authorize('view', $assessment);

        return Inertia::render('Assessments/Show', [
            'assessment' => [
                'id' => $assessment->id,
                'type' => $assessment->type,
                'answers' => $assessment->answers,
                'results' => $assessment->results,
                'score' => $assessment->score,
                'recommendations' => $assessment->recommendations,
                'completed_at' => $assessment->completed_at?->format('M d, Y'),
            ],
        ]);
    }
}
