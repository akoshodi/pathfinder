<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnetTechnologySkill extends Model
{
    protected $table = 'onet_technology_skills';

    public $timestamps = false;

    protected $fillable = [
        'onetsoc_code',
        'example',
        'hot_technology',
        'in_demand',
    ];

    public function occupation(): BelongsTo
    {
        return $this->belongsTo(OnetOccupation::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function scopeHotTechnology($query)
    {
        return $query->where('hot_technology', 'Y');
    }

    public function scopeInDemand($query)
    {
        return $query->where('in_demand', 'Y');
    }
}
