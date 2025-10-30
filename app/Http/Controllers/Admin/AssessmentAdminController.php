<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AssessmentReport;
use App\Models\UserAssessmentAttempt;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AssessmentAdminController extends Controller
{
    public function attempts(Request $request): Response
    {
        $query = UserAssessmentAttempt::query()
            ->with(['assessmentType:id,name,slug', 'user:id,name,email'])
            ->latest('completed_at')
            ->latest('started_at');

        if ($status = $request->get('status')) {
            if ($status === 'completed') {
                $query->whereNotNull('completed_at');
            } elseif ($status === 'in_progress') {
                $query->whereNull('completed_at')->whereNotNull('started_at');
            }
        }

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('assessmentType', function ($aq) use ($search) {
                    $aq->where('name', 'like', "%{$search}%");
                })->orWhereHas('user', function ($uq) use ($search) {
                    $uq->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%");
                });
            });
        }

        // Sorting
        $sort = $request->get('sort');
        $direction = strtolower($request->get('direction', 'desc')) === 'asc' ? 'asc' : 'desc';
        if (in_array($sort, ['started_at', 'completed_at', 'id'])) {
            $query->orderBy($sort, $direction);
        }

        $attempts = $query->paginate(20)->withQueryString();

        $data = $attempts->through(function (UserAssessmentAttempt $a) {
            return [
                'id' => $a->id,
                'assessment' => [
                    'name' => $a->assessmentType?->name,
                    'slug' => $a->assessmentType?->slug,
                ],
                'user' => $a->user ? [
                    'id' => $a->user->id,
                    'name' => $a->user->name,
                    'email' => $a->user->email,
                ] : null,
                'started_at' => $a->started_at,
                'completed_at' => $a->completed_at,
                'progress' => $a->calculateProgress(),
            ];
        });

        return Inertia::render('Admin/Assessments/Attempts', [
            'attempts' => $data,
            'filters' => $request->only(['search', 'status', 'sort', 'direction']),
        ]);
    }

    public function reports(Request $request): Response
    {
        $query = AssessmentReport::query()
            ->with(['attempt.assessmentType:id,name,slug', 'user:id,name,email'])
            ->latest('generated_at');

        if ($type = $request->get('type')) {
            $query->where('report_type', $type);
        }

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhereHas('attempt.assessmentType', function ($aq) use ($search) {
                        $aq->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        // Sorting
        $sort = $request->get('sort');
        $direction = strtolower($request->get('direction', 'desc')) === 'asc' ? 'asc' : 'desc';
        if (in_array($sort, ['generated_at', 'id'])) {
            $query->orderBy($sort, $direction);
        }

        $reports = $query->paginate(20)->withQueryString();

        $data = $reports->through(function (AssessmentReport $r) {
            return [
                'id' => $r->id,
                'title' => $r->title,
                'report_type' => $r->report_type,
                'assessment' => [
                    'name' => $r->attempt?->assessmentType?->name,
                    'slug' => $r->attempt?->assessmentType?->slug,
                ],
                'user' => $r->user ? [
                    'id' => $r->user->id,
                    'name' => $r->user->name,
                    'email' => $r->user->email,
                ] : null,
                'generated_at' => $r->generated_at,
            ];
        });

        return Inertia::render('Admin/Assessments/Reports', [
            'reports' => $data,
            'filters' => $request->only(['search', 'type', 'sort', 'direction']),
        ]);
    }

    /**
     * Export attempts as CSV respecting filters.
     */
    public function exportAttempts(Request $request): StreamedResponse
    {
        $query = UserAssessmentAttempt::query()
            ->with(['assessmentType:id,name,slug', 'user:id,name,email']);

        if ($status = $request->get('status')) {
            if ($status === 'completed') {
                $query->whereNotNull('completed_at');
            } elseif ($status === 'in_progress') {
                $query->whereNull('completed_at')->whereNotNull('started_at');
            }
        }

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('assessmentType', function ($aq) use ($search) {
                    $aq->where('name', 'like', "%{$search}%");
                })->orWhereHas('user', function ($uq) use ($search) {
                    $uq->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%");
                });
            });
        }

        $sort = $request->get('sort');
        $direction = strtolower($request->get('direction', 'desc')) === 'asc' ? 'asc' : 'desc';
        if (in_array($sort, ['started_at', 'completed_at', 'id'])) {
            $query->orderBy($sort, $direction);
        } else {
            $query->latest('completed_at')->latest('started_at');
        }

        $filename = 'assessment-attempts.csv';

        return response()->streamDownload(function () use ($query) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['ID', 'Assessment', 'User', 'Email', 'Started At', 'Completed At', 'Progress']);

            $query->chunk(500, function ($chunk) use ($handle) {
                foreach ($chunk as $a) {
                    fputcsv($handle, [
                        $a->id,
                        $a->assessmentType?->name,
                        $a->user?->name,
                        $a->user?->email,
                        optional($a->started_at)->toDateTimeString(),
                        optional($a->completed_at)->toDateTimeString(),
                        $a->calculateProgress(),
                    ]);
                }
            });

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
        ]);
    }

    /**
     * Export reports as CSV respecting filters.
     */
    public function exportReports(Request $request): StreamedResponse
    {
        $query = AssessmentReport::query()
            ->with(['attempt.assessmentType:id,name,slug', 'user:id,name,email']);

        if ($type = $request->get('type')) {
            $query->where('report_type', $type);
        }

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhereHas('attempt.assessmentType', function ($aq) use ($search) {
                        $aq->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        $sort = $request->get('sort');
        $direction = strtolower($request->get('direction', 'desc')) === 'asc' ? 'asc' : 'desc';
        if (in_array($sort, ['generated_at', 'id'])) {
            $query->orderBy($sort, $direction);
        } else {
            $query->latest('generated_at');
        }

        $filename = 'assessment-reports.csv';

        return response()->streamDownload(function () use ($query) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['ID', 'Title', 'Type', 'Assessment', 'User', 'Email', 'Generated At']);

            $query->chunk(500, function ($chunk) use ($handle) {
                foreach ($chunk as $r) {
                    fputcsv($handle, [
                        $r->id,
                        $r->title,
                        $r->report_type,
                        $r->attempt?->assessmentType?->name,
                        $r->user?->name,
                        $r->user?->email,
                        optional($r->generated_at)->toDateTimeString(),
                    ]);
                }
            });

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
        ]);
    }
}
