<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ComparisonItem extends Model
{
    protected $fillable = [
        'user_id',
        'comparable_type',
        'comparable_id',
        'position',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comparable(): MorphTo
    {
        return $this->morphTo();
    }
}
