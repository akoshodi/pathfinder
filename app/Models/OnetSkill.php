<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnetSkill extends Model
{
    protected $table = 'onet_skills';

    public $timestamps = false;

    protected $fillable = [
        'onetsoc_code',
        'element_id',
        'scale_id',
        'data_value',
    ];

    public function occupation(): BelongsTo
    {
        return $this->belongsTo(OnetOccupation::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function element(): BelongsTo
    {
        return $this->belongsTo(OnetContentModelReference::class, 'element_id', 'element_id');
    }

    /**
     * Scope to get only "Level" scale skills (IM for Importance).
     */
    public function scopeLevel($query)
    {
        return $query->where('scale_id', 'LV');
    }

    /**
     * Scope to get only "Importance" scale skills.
     */
    public function scopeImportance($query)
    {
        return $query->where('scale_id', 'IM');
    }

    /**
     * Scope to order by data value descending (most important first).
     */
    public function scopeOrderByImportance($query)
    {
        return $query->orderBy('data_value', 'desc');
    }
}
