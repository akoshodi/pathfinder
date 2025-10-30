<?php

namespace App\Services\Assessment;

use App\Models\UserAssessmentAttempt;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class ComprehensivePdfService
{
    public function __construct(
        protected CareerFitAnalysisService $careerFitService
    ) {}

    /**
     * Generate comprehensive PDF report for career fit analysis.
     */
    public function generateCareerFitPdf(int $userId): string
    {
        $user = \App\Models\User::findOrFail($userId);

        // Get career fit analysis
        $analysis = $this->careerFitService->analyzeCareerFit($user);

        // Generate PDF
        $pdf = Pdf::loadView('pdf.career-fit-report', [
            'user' => $user,
            'analysis' => $analysis,
            'generatedAt' => now()->format('F j, Y'),
        ]);

        // Save PDF
        $filename = "career-fit-{$userId}-".now()->timestamp.'.pdf';
        $path = "reports/{$filename}";

        Storage::disk('public')->put($path, $pdf->output());

        return $path;
    }

    /**
     * Generate individual assessment PDF.
     */
    public function generateAssessmentPdf(UserAssessmentAttempt $attempt): string
    {
        $report = $attempt->report;

        if (! $report) {
            throw new \Exception('Assessment report not found.');
        }

        $assessmentType = $attempt->assessmentType;
        $category = $assessmentType->category ?? $assessmentType->slug;

        // Select appropriate view based on category
        $view = match ($category) {
            'career_interest', 'riasec' => 'pdf.riasec-report',
            'skills' => 'pdf.skills-report',
            'personality' => 'pdf.personality-report',
            default => 'pdf.general-report',
        };

        $pdf = Pdf::loadView($view, [
            'user' => $attempt->user,
            'attempt' => $attempt,
            'report' => $report,
            'assessmentType' => $assessmentType,
            'generatedAt' => now()->format('F j, Y'),
        ]);

        // Save PDF
        $filename = "{$assessmentType->slug}-{$attempt->id}-".now()->timestamp.'.pdf';
        $path = "reports/{$filename}";

        Storage::disk('public')->put($path, $pdf->output());

        // Update report with PDF path
        $report->update(['pdf_path' => $path]);

        return $path;
    }
}
