<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Career extends Model
{
    /** @use HasFactory<\Database\Factories\CareerFactory> */
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'requirements' => 'array',
            'responsibilities' => 'array',
            'benefits' => 'array',
            'skills_required' => 'array',
            'is_remote' => 'boolean',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'deadline' => 'date',
        ];
    }

    protected $fillable = [
        'company_id',
        'title',
        'slug',
        'description',
        'type',
        'location',
        'is_remote',
        'salary_range',
        'experience_level',
        'requirements',
        'responsibilities',
        'benefits',
        'skills_required',
        'application_url',
        'deadline',
        'is_active',
        'is_featured',
        'applications_count',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function savedItems(): MorphMany
    {
        return $this->morphMany(SavedItem::class, 'saveable');
    }
}
