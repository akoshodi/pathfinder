<?php

namespace App\Services;

use App\Models\AssessmentType;
use App\Models\User;
use App\Models\UserAssessmentAttempt;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    /**
     * Get comprehensive dashboard statistics
     */
    public function getDashboardStats(): array
    {
        return [
            'users' => $this->getUserStats(),
            'assessments' => $this->getAssessmentStats(),
            'activity' => $this->getActivityStats(),
            'trends' => $this->getTrendData(),
        ];
    }

    /**
     * Get user statistics
     */
    public function getUserStats(): array
    {
        $totalUsers = User::count();
        $activeUsers = User::where('created_at', '>=', now()->subDays(30))->count();
        $verifiedUsers = User::whereNotNull('email_verified_at')->count();

        return [
            'total' => $totalUsers,
            'active_30_days' => $activeUsers,
            'verified' => $verifiedUsers,
            'verification_rate' => $totalUsers > 0 ? round(($verifiedUsers / $totalUsers) * 100, 1) : 0,
            'growth_rate' => $this->calculateGrowthRate(User::class, 30),
        ];
    }

    /**
     * Get assessment statistics
     */
    public function getAssessmentStats(): array
    {
        $assessmentTypes = AssessmentType::all();
        $stats = [];

        foreach ($assessmentTypes as $type) {
            $totalAttempts = UserAssessmentAttempt::where('assessment_type_id', $type->id)->count();
            $completedAttempts = UserAssessmentAttempt::where('assessment_type_id', $type->id)
                ->whereNotNull('completed_at')
                ->count();

            $stats[$type->slug] = [
                'name' => $type->name,
                'total_attempts' => $totalAttempts,
                'completed' => $completedAttempts,
                'completion_rate' => $totalAttempts > 0 ? round(($completedAttempts / $totalAttempts) * 100, 1) : 0,
                'avg_time' => $this->getAverageCompletionTime($type->id),
            ];
        }

        return $stats;
    }

    /**
     * Get activity statistics
     */
    public function getActivityStats(): array
    {
        $today = now()->startOfDay();

        return [
            'today' => [
                'new_users' => User::where('created_at', '>=', $today)->count(),
                'assessments_started' => UserAssessmentAttempt::where('started_at', '>=', $today)->count(),
                'assessments_completed' => UserAssessmentAttempt::where('completed_at', '>=', $today)->count(),
            ],
            'this_week' => [
                'new_users' => User::where('created_at', '>=', now()->startOfWeek())->count(),
                'assessments_started' => UserAssessmentAttempt::where('started_at', '>=', now()->startOfWeek())->count(),
                'assessments_completed' => UserAssessmentAttempt::where('completed_at', '>=', now()->startOfWeek())->count(),
            ],
            'this_month' => [
                'new_users' => User::where('created_at', '>=', now()->startOfMonth())->count(),
                'assessments_started' => UserAssessmentAttempt::where('started_at', '>=', now()->startOfMonth())->count(),
                'assessments_completed' => UserAssessmentAttempt::where('completed_at', '>=', now()->startOfMonth())->count(),
            ],
        ];
    }

    /**
     * Get trend data for charts (last 30 days)
     */
    public function getTrendData(int $days = 30): array
    {
        $startDate = now()->subDays($days)->startOfDay();

        // User registrations trend
        $userTrend = User::where('created_at', '>=', $startDate)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn ($item) => [
                'date' => $item->date,
                'count' => $item->count,
            ])
            ->toArray();

        // Assessment completions trend
        $assessmentTrend = UserAssessmentAttempt::whereNotNull('completed_at')
            ->where('completed_at', '>=', $startDate)
            ->selectRaw('DATE(completed_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn ($item) => [
                'date' => $item->date,
                'count' => $item->count,
            ])
            ->toArray();

        return [
            'user_registrations' => $userTrend,
            'assessment_completions' => $assessmentTrend,
        ];
    }

    /**
     * Get assessment completion distribution by type
     */
    public function getAssessmentDistribution(): array
    {
        $distribution = UserAssessmentAttempt::whereNotNull('completed_at')
            ->select('assessment_type_id', DB::raw('COUNT(*) as count'))
            ->groupBy('assessment_type_id')
            ->get()
            ->map(function ($item) {
                $type = AssessmentType::find($item->assessment_type_id);

                return [
                    'name' => $type?->name ?? 'Unknown',
                    'slug' => $type?->slug ?? 'unknown',
                    'count' => $item->count,
                ];
            })
            ->toArray();

        return $distribution;
    }

    /**
     * Get top careers based on assessment results
     */
    public function getTopCareers(int $limit = 10): array
    {
        // This would analyze career recommendations from assessment reports
        // For now, return placeholder data
        return [
            ['title' => 'Software Developer', 'count' => 156],
            ['title' => 'Data Scientist', 'count' => 142],
            ['title' => 'Product Manager', 'count' => 128],
            ['title' => 'UX Designer', 'count' => 115],
            ['title' => 'Marketing Manager', 'count' => 98],
        ];
    }

    /**
     * Calculate growth rate compared to previous period
     */
    protected function calculateGrowthRate(string $model, int $days): float
    {
        $currentPeriod = $model::where('created_at', '>=', now()->subDays($days))->count();
        $previousPeriod = $model::where('created_at', '>=', now()->subDays($days * 2))
            ->where('created_at', '<', now()->subDays($days))
            ->count();

        if ($previousPeriod === 0) {
            return $currentPeriod > 0 ? 100.0 : 0.0;
        }

        return round((($currentPeriod - $previousPeriod) / $previousPeriod) * 100, 1);
    }

    /**
     * Get average completion time for an assessment type
     */
    protected function getAverageCompletionTime(int $assessmentTypeId): ?int
    {
        $avg = UserAssessmentAttempt::where('assessment_type_id', $assessmentTypeId)
            ->whereNotNull('completed_at')
            ->selectRaw('AVG(TIMESTAMPDIFF(MINUTE, started_at, completed_at)) as avg_minutes')
            ->value('avg_minutes');

        return $avg ? (int) round($avg) : null;
    }
}
