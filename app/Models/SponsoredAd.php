<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SponsoredAd extends Model
{
    /** @use HasFactory<\Database\Factories\SponsoredAdFactory> */
    use HasFactory;

    protected $fillable = [
        'university_id',
        'campaign_name',
        'tagline',
        'position',
        'is_active',
        'starts_at',
        'ends_at',
    ];

    public function university(): BelongsTo
    {
        return $this->belongsTo(University::class);
    }

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
        ];
    }

    /**
     * Get active sponsored ads for display.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('starts_at')
                    ->orWhere('starts_at', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('ends_at')
                    ->orWhere('ends_at', '>=', now());
            })
            ->orderBy('position');
    }
}
