<?php

namespace App\Services\Assessment;

use App\Models\UserAssessmentAttempt;

class SkillsScoringService
{
    /**
     * Calculate skills scores from assessment responses.
     */
    public function calculateScores(UserAssessmentAttempt $attempt): array
    {
        $responses = $attempt->responses()->get();

        if ($responses->isEmpty()) {
            return [];
        }

        // Prefer explicit question_category on response; fallback to question->category if relation loaded later
        $grouped = $responses->groupBy(function ($response) {
            return $response->question_category ?? optional($response->question)->category ?? 'General';
        });

        $scores = [];
        foreach ($grouped as $category => $items) {
            $avg = (float) $items->avg(fn ($r) => (float) $r->response_value);
            $percent = round((($avg - 1) / 4) * 100, 1);
            $scores[$category] = [
                'score' => $percent,
                'level' => $this->getProficiencyLevel($percent),
            ];
        }

        return $scores;
    }

    /**
     * Get proficiency level for a score.
     */
    protected function getProficiencyLevel(float $score): string
    {
        if ($score >= 100.0) {
            return 'Expert';
        }
        if ($score >= 75.0) {
            return 'Proficient';
        }
        if ($score >= 50.0) {
            return 'Intermediate';
        }
        if ($score >= 25.0) {
            return 'Intermediate';
        }

        return 'Novice';
    }

    /**
     * Get empty scores structure.
     */
    protected function getEmptyScores(): array
    {
        return [];
    }
}
