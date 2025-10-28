<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class AlumniAssociation extends Model
{
    /** @use HasFactory<\Database\Factories\AlumniAssociationFactory> */
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_active' => 'boolean',
        ];
    }

    protected $fillable = [
        'university_id',
        'name',
        'slug',
        'description',
        'logo',
        'members_count',
        'mentors_count',
        'internships_count',
        'founded_year',
        'website',
        'email',
        'phone',
        'features',
        'is_active',
    ];

    public function university(): BelongsTo
    {
        return $this->belongsTo(University::class);
    }
}
