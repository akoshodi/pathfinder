<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_type_id',
        'question_text',
        'question_type',
        'options',
        'min_value',
        'max_value',
        'scale_label_min',
        'scale_label_max',
        'scoring_map',
        'category',
        'order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'options' => 'array',
            'scoring_map' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function assessmentType(): BelongsTo
    {
        return $this->belongsTo(AssessmentType::class);
    }

    public function responses(): HasMany
    {
        return $this->hasMany(UserAssessmentResponse::class, 'question_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForCategory($query, string $category)
    {
        return $query->where('category', $category);
    }
}
