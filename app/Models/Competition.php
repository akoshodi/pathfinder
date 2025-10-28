<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Competition extends Model
{
    /** @use HasFactory<\Database\Factories\CompetitionFactory> */
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'eligibility_requirements' => 'array',
            'prize_amount' => 'decimal:2',
            'registration_start' => 'datetime',
            'registration_end' => 'datetime',
            'competition_date' => 'datetime',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    protected $fillable = [
        'title',
        'slug',
        'description',
        'category',
        'organizer',
        'website_url',
        'prize_amount',
        'prize_description',
        'eligibility_requirements',
        'registration_start',
        'registration_end',
        'competition_date',
        'location',
        'format',
        'image',
        'participants_count',
        'is_featured',
        'is_active',
    ];
}
