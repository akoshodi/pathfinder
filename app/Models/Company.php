<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'benefits' => 'array',
            'values' => 'array',
            'is_partner' => 'boolean',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    protected $fillable = [
        'name',
        'slug',
        'description',
        'logo',
        'cover_image',
        'category',
        'location',
        'city',
        'state',
        'country',
        'employees',
        'website',
        'email',
        'phone',
        'internships_count',
        'jobs_count',
        'is_partner',
        'is_featured',
        'is_active',
        'benefits',
        'values',
    ];

    public function careers(): HasMany
    {
        return $this->hasMany(Career::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('relationship', 'position', 'is_verified')
            ->withTimestamps();
    }

    public function employees(): BelongsToMany
    {
        return $this->users()->wherePivot('relationship', 'employee');
    }

    public function representatives(): BelongsToMany
    {
        return $this->users()->wherePivot('relationship', 'representative');
    }

    public function followers(): BelongsToMany
    {
        return $this->users()->wherePivot('relationship', 'follower');
    }

    public function savedItems(): MorphMany
    {
        return $this->morphMany(SavedItem::class, 'saveable');
    }

    public function comparisonItems(): MorphMany
    {
        return $this->morphMany(ComparisonItem::class, 'comparable');
    }
}
