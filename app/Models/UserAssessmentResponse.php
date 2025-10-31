<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAssessmentResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'attempt_id',
        'question_id',
        'response_value',
        'response_text',
        'response_score',
        'time_spent_seconds',
        'question_category',
    ];

    protected function casts(): array
    {
        return [
            'response_score' => 'integer',
            'time_spent_seconds' => 'integer',
            'response_value' => 'string',
        ];
    }

    public function attempt(): BelongsTo
    {
        return $this->belongsTo(UserAssessmentAttempt::class, 'attempt_id');
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(AssessmentQuestion::class, 'question_id');
    }
}
