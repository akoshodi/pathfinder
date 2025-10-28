<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnetAlternateTitle extends Model
{
    protected $table = 'onet_alternate_titles';

    public $timestamps = false;

    protected $fillable = [
        'onetsoc_code',
        'alternate_title',
        'short_title',
    ];

    public function occupation(): BelongsTo
    {
        return $this->belongsTo(OnetOccupation::class, 'onetsoc_code', 'onetsoc_code');
    }
}
