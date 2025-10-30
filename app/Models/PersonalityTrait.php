<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PersonalityTrait extends Model
{
    use HasFactory;

    protected $fillable = [
        'attempt_id',
        'openness_score',
        'conscientiousness_score',
        'extraversion_score',
        'agreeableness_score',
        'emotional_stability_score',
        'mbti_type',
        'work_style_preferences',
    ];

    protected function casts(): array
    {
        return [
            'work_style_preferences' => 'array',
        ];
    }

    public function attempt(): BelongsTo
    {
        return $this->belongsTo(UserAssessmentAttempt::class, 'attempt_id');
    }

    public function getBigFiveScores(): array
    {
        return [
            'Openness' => $this->openness_score,
            'Conscientiousness' => $this->conscientiousness_score,
            'Extraversion' => $this->extraversion_score,
            'Agreeableness' => $this->agreeableness_score,
            'Emotional Stability' => $this->emotional_stability_score,
        ];
    }

    public function getPersonalitySummary(): string
    {
        $traits = [];

        if ($this->openness_score >= 70) {
            $traits[] = 'creative and open to new experiences';
        }
        if ($this->conscientiousness_score >= 70) {
            $traits[] = 'organized and dependable';
        }
        if ($this->extraversion_score >= 70) {
            $traits[] = 'outgoing and energetic';
        }
        if ($this->agreeableness_score >= 70) {
            $traits[] = 'cooperative and compassionate';
        }
        if ($this->emotional_stability_score >= 70) {
            $traits[] = 'calm and emotionally resilient';
        }

        return empty($traits) ? 'Balanced personality profile' : 'You are '.implode(', ', $traits);
    }
}
