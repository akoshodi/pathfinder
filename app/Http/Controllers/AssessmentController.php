<?php

namespace App\Http\Controllers;

use App\Models\AssessmentQuestion;
use App\Models\AssessmentType;
use App\Models\UserAssessmentAttempt;
use App\Models\UserAssessmentResponse;
use App\Services\Assessment\PersonalityScoringService;
use App\Services\Assessment\ReportGenerationService;
use App\Services\Assessment\SkillScoringService;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    /**
     * Display available assessments
     */
    public function index(): InertiaResponse
    {
        $assessments = AssessmentType::active()
            ->get()
            ->map(function ($assessment) {
                return [
                    'id' => $assessment->id,
                    'name' => $assessment->name,
                    'slug' => $assessment->slug,
                    'description' => $assessment->description,
                    'category' => $assessment->category,
                    'question_count' => $assessment->question_count,
                    // Map DB field to UI-friendly name
                    'estimated_duration' => $assessment->duration_minutes,
                    'instructions' => $assessment->instructions,
                ];
            });

        $userAttempts = auth()->check()
            ? UserAssessmentAttempt::where('user_id', auth()->id())
                ->with('assessmentType')
                ->latest()
                ->limit(5)
                ->get()
            : [];

        return Inertia::render('Assessments/Index', [
            'assessments' => $assessments,
            'recentAttempts' => $userAttempts,
        ]);
    }

    /**
     * Start a new assessment attempt
     */
    public function start(Request $request, string $slug): RedirectResponse
    {
        $assessmentType = AssessmentType::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // Check if user has an in-progress attempt (started but not completed)
        if (auth()->check()) {
            $existingAttempt = UserAssessmentAttempt::where('user_id', auth()->id())
                ->where('assessment_type_id', $assessmentType->id)
                ->whereNotNull('started_at')
                ->whereNull('completed_at')
                ->first();

            if ($existingAttempt) {
                return redirect()->route('assessments.take', $existingAttempt->id);
            }
        }

        // Create new attempt
        $attempt = UserAssessmentAttempt::create([
            'user_id' => auth()->id(),
            'session_id' => $request->session()->getId(),
            'assessment_type_id' => $assessmentType->id,
            'started_at' => now(),
        ]);

        return redirect()->route('assessments.take', $attempt->id);
    }

    /**
     * Display assessment questions
     */
    public function take(UserAssessmentAttempt $attempt): SymfonyResponse
    {
        // Verify user can access this attempt
        if (auth()->check() && $attempt->user_id !== auth()->id()) {
            abort(403);
        }

        if (! auth()->check() && $attempt->session_id !== request()->session()->getId()) {
            abort(403);
        }

        if ($attempt->isCompleted()) {
            return redirect()->route('assessments.results', $attempt->id);
        }

        $assessmentType = $attempt->assessmentType;
        $questions = AssessmentQuestion::where('assessment_type_id', $assessmentType->id)
            ->where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($question) {
                return [
                    'id' => $question->id,
                    'question_text' => $question->question_text,
                    'question_type' => $question->question_type,
                    'category' => $question->category,
                    'options' => $question->options,
                    'order' => $question->order,
                ];
            });

        $existingResponses = UserAssessmentResponse::where('attempt_id', $attempt->id)
            ->get()
            ->keyBy('question_id');

        return Inertia::render('Assessments/Take', [
            'attempt' => [
                'id' => $attempt->id,
                'status' => $attempt->isCompleted() ? 'completed' : ($attempt->started_at ? 'in_progress' : 'not_started'),
                'progress' => $attempt->calculateProgress(),
                'started_at' => $attempt->started_at,
            ],
            'assessment' => [
                'name' => $assessmentType->name,
                'slug' => $assessmentType->slug,
                'description' => $assessmentType->description,
                'instructions' => $assessmentType->instructions,
                'question_count' => $assessmentType->question_count,
            ],
            'questions' => $questions,
            'responses' => $existingResponses,
        ]);
    }

    /**
     * Save assessment response
     */
    public function answer(Request $request, UserAssessmentAttempt $attempt): JsonResponse
    {
        // Verify user can access this attempt
        if (auth()->check() && $attempt->user_id !== auth()->id()) {
            abort(403);
        }

        if (! auth()->check() && $attempt->session_id !== request()->session()->getId()) {
            abort(403);
        }

        $validated = $request->validate([
            'question_id' => 'required|exists:assessment_questions,id',
            'response_value' => 'required',
            'time_spent' => 'nullable|integer',
        ]);

        $question = AssessmentQuestion::findOrFail($validated['question_id']);

        // Calculate response score based on scoring_map
        $responseScore = $this->calculateResponseScore($question, $validated['response_value']);

        UserAssessmentResponse::updateOrCreate(
            [
                'attempt_id' => $attempt->id,
                'question_id' => $validated['question_id'],
            ],
            [
                'response_value' => $validated['response_value'],
                'response_score' => is_int($responseScore) ? $responseScore : null,
                'time_spent_seconds' => $validated['time_spent'] ?? null,
            ]
        );

        $progress = $attempt->calculateProgress();

        return response()->json([
            'success' => true,
            'progress' => $progress,
        ]);
    }

    /**
     * Complete assessment and generate report
     */
    public function complete(UserAssessmentAttempt $attempt): RedirectResponse
    {
        // Verify user can access this attempt
        if (auth()->check() && $attempt->user_id !== auth()->id()) {
            abort(403);
        }

        if (! auth()->check() && $attempt->session_id !== request()->session()->getId()) {
            abort(403);
        }

        if ($attempt->isCompleted()) {
            return redirect()->route('assessments.results', $attempt->id);
        }

        // Mark as completed
        $attempt->update([
            'completed_at' => now(),
        ]);

        // Generate report
        $reportService = new ReportGenerationService;
        $report = $reportService->generate($attempt);

        return redirect()->route('assessments.results', $attempt->id);
    }

    /**
     * Display assessment results
     */
    public function results(UserAssessmentAttempt $attempt): SymfonyResponse
    {
        // Verify user can access this attempt
        if (auth()->check() && $attempt->user_id !== auth()->id()) {
            abort(403);
        }

        if (! auth()->check() && $attempt->session_id !== request()->session()->getId()) {
            abort(403);
        }

        if (! $attempt->isCompleted()) {
            return redirect()->route('assessments.take', $attempt->id);
        }

        $report = $attempt->report;

        if (! $report) {
            // Generate report if missing
            $reportService = new ReportGenerationService;
            $report = $reportService->generate($attempt);
        }

        // Determine category with fallback via slug
        $assessmentType = $attempt->assessmentType;
        $category = $assessmentType->category ?? match ($assessmentType->slug) {
            'riasec' => 'career_interest',
            'skills' => 'skills',
            'personality' => 'personality',
            default => null,
        };

        // Build dynamic insights and recommendations (not persisted in DB)
        $reportService = new ReportGenerationService;
        $insights = $reportService->generateInsights($attempt);
        $recommendations = $reportService->generateRecommendations($attempt);

        $data = [
            'attempt' => [
                'id' => $attempt->id,
                'completed_at' => $attempt->completed_at,
            ],
            'assessment' => [
                'name' => $attempt->assessmentType->name,
                'category' => $category,
            ],
            'report' => [
                'id' => $report->id,
                'summary' => $report->summary,
                'top_traits' => $report->top_traits,
                'insights' => $insights,
                'recommendations' => $recommendations,
                'visualization_data' => $report->visualization_data,
            ],
        ];

        // Add category-specific data
        if ($category === 'career_interest') {
            $riasecScore = $attempt->riasecScore;
            if ($riasecScore) {
                $data['riasec'] = [
                    'holland_code' => $riasecScore->holland_code,
                    'primary_code' => $riasecScore->primary_code,
                    'secondary_code' => $riasecScore->secondary_code,
                    'tertiary_code' => $riasecScore->tertiary_code,
                    'scores' => $riasecScore->getAllScores(),
                    'top_codes' => $riasecScore->getTopThreeCodes(),
                ];
            }
        }

        if ($category === 'personality') {
            $trait = $attempt->personalityTrait;
            if ($trait) {
                $data['personalityPreferences'] = $trait->work_style_preferences ?? [];
            }

            // Provide Big Five trait descriptions for tooltips
            $personalityService = new PersonalityScoringService;
            $data['personalityTraitDescriptions'] = $personalityService->getTraitDescriptions();
        }

        if ($category === 'skills') {
            // Provide domain descriptions and server-computed labels per domain for tooltips and badges
            $skillService = new SkillScoringService;
            $data['skillsMeta'] = [
                'domainDescriptions' => $skillService->getDomainDescriptions(),
                'labels' => (function () use ($skillService, $report) {
                    $labels = [];
                    $viz = $report->visualization_data ?? [];
                    $ds = $viz['datasets'][0]['data'] ?? [];
                    $names = $viz['labels'] ?? [];
                    foreach ($names as $idx => $name) {
                        $level = (int) ($ds[$idx] ?? 0); // 1-5 level
                        $percent = max(0, min(100, ($level / 5) * 100));
                        $labels[$name] = $skillService->getProficiencyLevel($percent);
                    }

                    return $labels;
                })(),
            ];
        }

        // Load career recommendations
        $careerRecommendations = $report->careerRecommendations()
            ->with('occupation')
            ->topRanked(10)
            ->get()
            ->map(function ($recommendation) {
                return [
                    'id' => $recommendation->id,
                    'occupation_code' => $recommendation->onetsoc_code,
                    'occupation_title' => $recommendation->occupation?->title,
                    'match_score' => $recommendation->match_score,
                    'match_reasons' => $recommendation->match_reasons,
                    'skill_gaps' => $recommendation->skill_gaps,
                    'education_requirements' => $recommendation->education_requirements,
                    'learning_paths' => $recommendation->learning_paths,
                    'rank' => $recommendation->rank,
                ];
            });

        $data['careerRecommendations'] = $careerRecommendations;

        return Inertia::render('Assessments/Results', $data);
    }

    /**
     * Calculate response score based on question's scoring map
     */
    protected function calculateResponseScore(AssessmentQuestion $question, $responseValue): mixed
    {
        $scoringMap = $question->scoring_map;

        if (! $scoringMap || ! isset($scoringMap[$responseValue])) {
            return null;
        }

        $value = $scoringMap[$responseValue];

        // If this is a personality question, scoring_map entries look like ['score' => n]
        if (is_array($value) && array_key_exists('score', $value)) {
            return (int) $value['score'];
        }

        // For other assessments (e.g., RIASEC), we don't persist complex maps; services use question->scoring_map
        return null;
    }

    /**
     * Export assessment results as a JSON download (placeholder for future PDF export).
     */
    public function export(UserAssessmentAttempt $attempt): StreamedResponse
    {
        // Verify user can access this attempt
        if (auth()->check() && $attempt->user_id !== auth()->id()) {
            abort(403);
        }

        if (! auth()->check() && $attempt->session_id !== request()->session()->getId()) {
            abort(403);
        }

        if (! $attempt->isCompleted()) {
            return redirect()->route('assessments.take', $attempt->id);
        }

        // Ensure report exists
        $report = $attempt->report;
        if (! $report) {
            $report = (new ReportGenerationService)->generate($attempt);
        }

        $payload = [
            'attempt' => [
                'id' => $attempt->id,
                'completed_at' => $attempt->completed_at,
            ],
            'assessment' => [
                'name' => $attempt->assessmentType->name,
                'slug' => $attempt->assessmentType->slug,
                'category' => $attempt->assessmentType->category,
            ],
            'report' => [
                'summary' => $report->summary,
                'top_traits' => $report->top_traits,
                'insights' => (new ReportGenerationService)->generateInsights($attempt),
                'recommendations' => (new ReportGenerationService)->generateRecommendations($attempt),
                'visualization_data' => $report->visualization_data,
            ],
        ];

        $filename = 'assessment-report-'.$attempt->id.'.json';

        return response()->streamDownload(function () use ($payload) {
            echo json_encode($payload, JSON_PRETTY_PRINT);
        }, $filename, [
            'Content-Type' => 'application/json',
        ]);
    }

    /**
     * Export assessment results as a PDF download.
     */
    public function exportPdf(UserAssessmentAttempt $attempt): SymfonyResponse
    {
        // Verify user can access this attempt
        if (auth()->check() && $attempt->user_id !== auth()->id()) {
            abort(403);
        }

        if (! auth()->check() && $attempt->session_id !== request()->session()->getId()) {
            abort(403);
        }

        if (! $attempt->isCompleted()) {
            return redirect()->route('assessments.take', $attempt->id);
        }

        // Ensure report exists
        $report = $attempt->report;
        if (! $report) {
            $report = (new ReportGenerationService)->generate($attempt);
        }

        // Determine category
        $assessmentType = $attempt->assessmentType;
        $category = $assessmentType->category ?? null;

        // Graceful handling if PDF package is not installed
        if (! class_exists(\Barryvdh\DomPDF\Facade\Pdf::class)) {
            abort(503, 'PDF export is not currently available.');
        }

        $riasec = null;
        if ($category === 'career_interest' && $attempt->riasecScore) {
            $riasec = [
                'holland_code' => $attempt->riasecScore->holland_code,
                'scores' => $attempt->riasecScore->getAllScores(),
            ];
        }

        $viewData = [
            'attempt' => $attempt,
            'assessment' => $assessmentType,
            'report' => $report,
            'category' => $category,
            'riasec' => $riasec,
        ];

        $pdf = PDF::loadView('pdf.assessment_report', $viewData)->setPaper('a4');

        return $pdf->download('assessment-report-'.$attempt->id.'.pdf');
    }
}
