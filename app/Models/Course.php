<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'learning_outcomes' => 'array',
            'prerequisites' => 'array',
            'syllabus' => 'array',
            'is_free' => 'boolean',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'price' => 'decimal:2',
            'rating' => 'decimal:2',
        ];
    }

    protected $fillable = [
        'title',
        'slug',
        'description',
        'provider',
        'duration',
        'level',
        'category',
        'students_count',
        'instructor',
        'rating',
        'reviews_count',
        'thumbnail',
        'video_url',
        'external_url',
        'price',
        'is_free',
        'learning_outcomes',
        'prerequisites',
        'syllabus',
        'is_featured',
        'is_active',
    ];

    public function universities(): BelongsToMany
    {
        return $this->belongsToMany(University::class)
            ->withPivot('course_code', 'credits')
            ->withTimestamps();
    }

    public function savedItems(): MorphMany
    {
        return $this->morphMany(SavedItem::class, 'saveable');
    }
}
