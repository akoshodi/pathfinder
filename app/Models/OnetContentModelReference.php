<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OnetContentModelReference extends Model
{
    protected $table = 'onet_content_model_reference';

    protected $primaryKey = 'element_id';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'element_id',
        'element_name',
        'description',
    ];
}
