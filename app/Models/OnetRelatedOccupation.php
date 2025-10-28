<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnetRelatedOccupation extends Model
{
    protected $table = 'onet_related_occupations';

    public $timestamps = false;

    protected $fillable = [
        'onetsoc_code',
        'related_onetsoc_code',
        'relatedness_tier',
    ];

    public function occupation(): BelongsTo
    {
        return $this->belongsTo(OnetOccupation::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function relatedOccupation(): BelongsTo
    {
        return $this->belongsTo(OnetOccupation::class, 'related_onetsoc_code', 'onetsoc_code');
    }
}
