<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserAssessmentAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'assessment_type_id',
        'session_id',
        'started_at',
        'completed_at',
        'progress_percentage',
        'raw_scores',
        'normalized_scores',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'started_at' => 'datetime',
            'completed_at' => 'datetime',
            'raw_scores' => 'array',
            'normalized_scores' => 'array',
            'metadata' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function assessmentType(): BelongsTo
    {
        return $this->belongsTo(AssessmentType::class);
    }

    public function responses(): HasMany
    {
        return $this->hasMany(UserAssessmentResponse::class, 'attempt_id');
    }

    public function report(): HasOne
    {
        return $this->hasOne(AssessmentReport::class, 'attempt_id');
    }

    public function riasecScore(): HasOne
    {
        return $this->hasOne(RiasecScore::class, 'attempt_id');
    }

    public function skillProficiencies(): HasMany
    {
        return $this->hasMany(SkillProficiency::class, 'attempt_id');
    }

    public function personalityTrait(): HasOne
    {
        return $this->hasOne(PersonalityTrait::class, 'attempt_id');
    }

    public function scopeCompleted($query)
    {
        return $query->whereNotNull('completed_at');
    }

    public function scopeInProgress($query)
    {
        return $query->whereNull('completed_at')->whereNotNull('started_at');
    }

    public function isCompleted(): bool
    {
        return $this->completed_at !== null;
    }

    public function calculateProgress(): int
    {
        $totalQuestions = $this->assessmentType->question_count;
        $answeredQuestions = $this->responses()->count();

        $progress = $totalQuestions > 0 ? (int) (($answeredQuestions / $totalQuestions) * 100) : 0;

        // Save progress percentage to database
        $this->update(['progress_percentage' => $progress]);

        return $progress;
    }
}
