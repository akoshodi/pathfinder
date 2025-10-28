<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnetInterest extends Model
{
    protected $table = 'onet_interests';

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

    public function scopeOrderByValue($query)
    {
        return $query->orderBy('data_value', 'desc');
    }
}
