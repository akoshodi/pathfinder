<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AnalyticsService;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AnalyticsController extends Controller
{
    public function __construct(
        protected AnalyticsService $analyticsService
    ) {}

    /**
     * Display the analytics dashboard
     */
    public function index(): InertiaResponse
    {
        $stats = $this->analyticsService->getDashboardStats();
        $distribution = $this->analyticsService->getAssessmentDistribution();
        $topCareers = $this->analyticsService->getTopCareers();

        return Inertia::render('Admin/Analytics/Dashboard', [
            'stats' => $stats,
            'distribution' => $distribution,
            'topCareers' => $topCareers,
        ]);
    }
}
