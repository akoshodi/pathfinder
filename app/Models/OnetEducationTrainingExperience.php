<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnetEducationTrainingExperience extends Model
{
    protected $table = 'onet_education_training_experience';

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
