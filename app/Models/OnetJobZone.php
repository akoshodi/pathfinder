<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnetJobZone extends Model
{
    protected $table = 'onet_job_zones';

    public $timestamps = false;

    protected $fillable = [
        'onetsoc_code',
        'job_zone',
    ];

    public function occupation(): BelongsTo
    {
        return $this->belongsTo(OnetOccupation::class, 'onetsoc_code', 'onetsoc_code');
    }
}
