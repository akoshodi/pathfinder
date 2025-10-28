<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resource extends Model
{
    /** @use HasFactory<\Database\Factories\ResourceFactory> */
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'categories' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'type',
        'url',
        'file_path',
        'thumbnail',
        'tags',
        'categories',
        'downloads_count',
        'views_count',
        'is_featured',
        'is_active',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
