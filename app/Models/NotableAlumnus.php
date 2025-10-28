<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NotableAlumnus extends Model
{
    /** @use HasFactory<\Database\Factories\NotableAlumnusFactory> */
    use HasFactory;

    protected $fillable = [
        'university_id',
        'name',
        'title',
        'image',
        'bio',
        'graduation_year',
        'order_column',
    ];

    public function university(): BelongsTo
    {
        return $this->belongsTo(University::class);
    }
}
