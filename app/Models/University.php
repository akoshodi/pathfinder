<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class University extends Model
{
    /** @use HasFactory<\Database\Factories\UniversityFactory> */
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'programs' => 'array',
            'majors' => 'array',
            'facilities' => 'array',
            'athletics' => 'array',
            'stats' => 'array',
            'is_partner' => 'boolean',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'graduation_rate' => 'decimal:2',
            'retention_rate' => 'decimal:2',
        ];
    }

    protected $fillable = [
        'name',
        'slug',
        'description',
        'logo',
        'cover_image',
        'location',
        'city',
        'state',
        'country',
        'type',
        'ranking',
        'acceptance_rate',
        'students_count',
        'tuition',
        'graduation_rate',
        'retention_rate',
        'campus_setting',
        'programs',
        'majors',
        'facilities',
        'athletics',
        'stats',
        'website',
        'phone',
        'is_partner',
        'is_featured',
        'is_active',
    ];

    public function alumniAssociations(): HasMany
    {
        return $this->hasMany(AlumniAssociation::class);
    }

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class)
            ->withPivot('course_code', 'credits')
            ->withTimestamps();
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('relationship', 'student_id', 'major', 'graduation_year')
            ->withTimestamps();
    }

    public function students(): BelongsToMany
    {
        return $this->users()->wherePivot('relationship', 'student');
    }

    public function alumni(): BelongsToMany
    {
        return $this->users()->wherePivot('relationship', 'alumni');
    }

    public function savedItems(): MorphMany
    {
        return $this->morphMany(SavedItem::class, 'saveable');
    }

    public function comparisonItems(): MorphMany
    {
        return $this->morphMany(ComparisonItem::class, 'comparable');
    }

    public function programsRelation(): BelongsToMany
    {
        return $this->belongsToMany(Program::class)
            ->withPivot('college', 'degree')
            ->withTimestamps();
    }

    public function notableAlumni(): HasMany
    {
        return $this->hasMany(NotableAlumnus::class)->orderBy('order_column')->orderBy('name');
    }
}
