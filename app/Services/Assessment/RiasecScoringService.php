<?php

namespace App\Services\Assessment;

use App\Models\RiasecScore;
use App\Models\UserAssessmentAttempt;

class RiasecScoringService
{
    /**
     * Calculate RIASEC scores from user responses
     */
    public function calculateScores(UserAssessmentAttempt $attempt): RiasecScore
    {
        $scores = [
            'R' => 0, // Realistic
            'I' => 0, // Investigative
            'A' => 0, // Artistic
            'S' => 0, // Social
            'E' => 0, // Enterprising
            'C' => 0, // Conventional
        ];

        $responses = $attempt->responses()->with('question')->get();

        foreach ($responses as $response) {
            $scoringMap = $response->question->scoring_map ?? [];

            if (isset($scoringMap[$response->response_value])) {
                foreach ($scoringMap[$response->response_value] as $code => $points) {
                    if (isset($scores[$code])) {
                        $scores[$code] += $points;
                    }
                }
            }
        }

        // Sort scores to get top 3
        arsort($scores);
        $topCodes = array_slice(array_keys($scores), 0, 3);

        return RiasecScore::create([
            'attempt_id' => $attempt->id,
            'realistic_score' => $scores['R'],
            'investigative_score' => $scores['I'],
            'artistic_score' => $scores['A'],
            'social_score' => $scores['S'],
            'enterprising_score' => $scores['E'],
            'conventional_score' => $scores['C'],
            'primary_code' => $topCodes[0] ?? 'R',
            'secondary_code' => $topCodes[1] ?? null,
            'tertiary_code' => $topCodes[2] ?? null,
            'holland_code' => implode('', $topCodes),
        ]);
    }

    /**
     * Get descriptions for RIASEC codes
     */
    public function getCodeDescriptions(): array
    {
        return [
            'R' => [
                'name' => 'Realistic',
                'description' => 'Practical, hands-on work with tools, machines, or outdoor activities',
                'traits' => ['Practical', 'Hands-on', 'Athletic', 'Mechanical'],
                'work_environments' => ['Construction', 'Agriculture', 'Engineering', 'Manufacturing'],
            ],
            'I' => [
                'name' => 'Investigative',
                'description' => 'Research, analysis, problem-solving, and scientific work',
                'traits' => ['Analytical', 'Curious', 'Scientific', 'Mathematical'],
                'work_environments' => ['Research Labs', 'Healthcare', 'Technology', 'Academia'],
            ],
            'A' => [
                'name' => 'Artistic',
                'description' => 'Creative expression, design, writing, and performing arts',
                'traits' => ['Creative', 'Expressive', 'Innovative', 'Imaginative'],
                'work_environments' => ['Design Studios', 'Media', 'Arts', 'Entertainment'],
            ],
            'S' => [
                'name' => 'Social',
                'description' => 'Helping, teaching, counseling, and working with people',
                'traits' => ['Empathetic', 'Cooperative', 'Supportive', 'Communicative'],
                'work_environments' => ['Education', 'Healthcare', 'Social Services', 'Counseling'],
            ],
            'E' => [
                'name' => 'Enterprising',
                'description' => 'Leadership, persuasion, business, and entrepreneurial activities',
                'traits' => ['Ambitious', 'Persuasive', 'Confident', 'Energetic'],
                'work_environments' => ['Business', 'Sales', 'Management', 'Politics'],
            ],
            'C' => [
                'name' => 'Conventional',
                'description' => 'Organization, data management, and structured office work',
                'traits' => ['Organized', 'Detail-oriented', 'Systematic', 'Reliable'],
                'work_environments' => ['Administration', 'Finance', 'Accounting', 'Data Management'],
            ],
        ];
    }

    /**
     * Get percentage distribution of RIASEC scores
     */
    public function getScoreDistribution(RiasecScore $riasecScore): array
    {
        $total = $riasecScore->realistic_score +
            $riasecScore->investigative_score +
            $riasecScore->artistic_score +
            $riasecScore->social_score +
            $riasecScore->enterprising_score +
            $riasecScore->conventional_score;

        if ($total === 0) {
            return array_fill_keys(['R', 'I', 'A', 'S', 'E', 'C'], 0);
        }

        return [
            'R' => round(($riasecScore->realistic_score / $total) * 100, 1),
            'I' => round(($riasecScore->investigative_score / $total) * 100, 1),
            'A' => round(($riasecScore->artistic_score / $total) * 100, 1),
            'S' => round(($riasecScore->social_score / $total) * 100, 1),
            'E' => round(($riasecScore->enterprising_score / $total) * 100, 1),
            'C' => round(($riasecScore->conventional_score / $total) * 100, 1),
        ];
    }
}
