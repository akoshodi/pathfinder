<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class MarketplaceItem extends Model
{
    /** @use HasFactory<\Database\Factories\MarketplaceItemFactory> */
    use HasFactory, SoftDeletes;

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'price' => 'decimal:2',
            'is_active' => 'boolean',
            'is_sold' => 'boolean',
            'sold_at' => 'datetime',
        ];
    }

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'category',
        'price',
        'condition',
        'images',
        'location',
        'contact_method',
        'views_count',
        'is_active',
        'is_sold',
        'sold_at',
    ];

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
