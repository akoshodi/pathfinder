<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RiasecScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'attempt_id',
        'realistic_score',
        'investigative_score',
        'artistic_score',
        'social_score',
        'enterprising_score',
        'conventional_score',
        'primary_code',
        'secondary_code',
        'tertiary_code',
        'holland_code',
    ];

    public function attempt(): BelongsTo
    {
        return $this->belongsTo(UserAssessmentAttempt::class, 'attempt_id');
    }

    public function getTopThreeCodes(): array
    {
        $scores = [
            'R' => $this->realistic_score,
            'I' => $this->investigative_score,
            'A' => $this->artistic_score,
            'S' => $this->social_score,
            'E' => $this->enterprising_score,
            'C' => $this->conventional_score,
        ];

        arsort($scores);

        return array_slice(array_keys($scores), 0, 3);
    }

    public function getHollandCodeAttribute(): string
    {
        return implode('', $this->getTopThreeCodes());
    }

    public function getAllScores(): array
    {
        return [
            'Realistic' => $this->realistic_score,
            'Investigative' => $this->investigative_score,
            'Artistic' => $this->artistic_score,
            'Social' => $this->social_score,
            'Enterprising' => $this->enterprising_score,
            'Conventional' => $this->conventional_score,
        ];
    }
}
