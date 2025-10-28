<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnetWorkStyle extends Model
{
    protected $table = 'onet_work_styles';

    public $timestamps = false;

    public function occupation(): BelongsTo
    {
        return $this->belongsTo(OnetOccupation::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function element(): BelongsTo
    {
        return $this->belongsTo(OnetContentModelReference::class, 'element_id', 'element_id');
    }
}
