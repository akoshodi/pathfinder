<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnetTool extends Model
{
    protected $table = 'onet_tools_used';

    public $timestamps = false;

    protected $fillable = [
        'onetsoc_code',
        'example',
    ];

    public function occupation(): BelongsTo
    {
        return $this->belongsTo(OnetOccupation::class, 'onetsoc_code', 'onetsoc_code');
    }
}
