<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentReport extends Model
{
    use HasFactory;

    protected $table = 'new_assessment_reports';

    protected $fillable = [
        'user_id',
        'attempt_id',
        'report_type',
        'title',
        'summary',
        'top_traits',
        'strengths',
        'growth_areas',
        'visualization_data',
        'pdf_path',
        'generated_at',
    ];

    protected function casts(): array
    {
        return [
            'top_traits' => 'array',
            'strengths' => 'array',
            'growth_areas' => 'array',
            'visualization_data' => 'array',
            'generated_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function attempt(): BelongsTo
    {
        return $this->belongsTo(UserAssessmentAttempt::class, 'attempt_id');
    }

    public function careerRecommendations(): HasMany
    {
        return $this->hasMany(CareerRecommendation::class, 'report_id')->orderBy('rank');
    }

    public function topCareerRecommendations(int $limit = 5): HasMany
    {
        return $this->careerRecommendations()->limit($limit);
    }
}
