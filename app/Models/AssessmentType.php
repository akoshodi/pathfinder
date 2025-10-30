<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'duration_minutes',
        'question_count',
        'scoring_config',
        'is_active',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'scoring_config' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function questions(): HasMany
    {
        return $this->hasMany(AssessmentQuestion::class)->where('is_active', true)->orderBy('order');
    }

    public function allQuestions(): HasMany
    {
        return $this->hasMany(AssessmentQuestion::class)->orderBy('order');
    }

    public function attempts(): HasMany
    {
        return $this->hasMany(UserAssessmentAttempt::class);
    }

    public function completedAttempts(): HasMany
    {
        return $this->attempts()->whereNotNull('completed_at');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('order');
    }
}
