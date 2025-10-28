<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model
{
    /** @use HasFactory<\Database\Factories\LocationFactory> */
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'highlights' => 'array',
            'is_featured' => 'boolean',
        ];
    }

    protected $fillable = [
        'name',
        'slug',
        'description',
        'city',
        'state',
        'country',
        'image',
        'universities_count',
        'companies_count',
        'highlights',
        'is_featured',
    ];

    public function universities(): HasMany
    {
        return $this->hasMany(University::class, 'city', 'city')
            ->where('state', $this->state);
    }

    public function companies(): HasMany
    {
        return $this->hasMany(Company::class, 'city', 'city')
            ->where('state', $this->state);
    }
}
