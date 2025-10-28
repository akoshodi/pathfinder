<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assessment extends Model
{
    protected function casts(): array
    {
        return [
            'questions' => 'array',
            'answers' => 'array',
            'results' => 'array',
            'recommendations' => 'array',
            'completed_at' => 'datetime',
        ];
    }

    protected $fillable = [
        'user_id',
        'type',
        'questions',
        'answers',
        'results',
        'score',
        'recommendations',
        'completed_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
