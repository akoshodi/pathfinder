<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnetTaskStatement extends Model
{
    protected $table = 'onet_task_statements';

    protected $primaryKey = 'task_id';

    public $timestamps = false;

    protected $fillable = [
        'task_id',
        'onetsoc_code',
        'task',
        'task_type',
    ];

    public function occupation(): BelongsTo
    {
        return $this->belongsTo(OnetOccupation::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function scopeCore($query)
    {
        return $query->where('task_type', 'Core');
    }
}
