<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CareerRecommendation extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_id',
        'onetsoc_code',
        'match_score',
        'match_reasons',
        'skill_gaps',
        'education_requirements',
        'learning_paths',
        'rank',
    ];

    protected function casts(): array
    {
        return [
            'match_score' => 'decimal:2',
            'match_reasons' => 'array',
            'skill_gaps' => 'array',
            'education_requirements' => 'array',
            'learning_paths' => 'array',
        ];
    }

    public function report(): BelongsTo
    {
        return $this->belongsTo(AssessmentReport::class, 'report_id');
    }

    public function occupation(): BelongsTo
    {
        return $this->belongsTo(OnetOccupation::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function scopeTopRanked($query, int $limit = 5)
    {
        return $query->orderBy('rank')->limit($limit);
    }

    public function scopeHighMatch($query, float $threshold = 70.0)
    {
        return $query->where('match_score', '>=', $threshold);
    }
}
