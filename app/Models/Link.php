<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Link extends Model
{
    /** @use HasFactory<\Database\Factories\LinkFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'url',
        'description',
    ];

    /**
     * Get the user who submitted the link.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get comments on this link.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(LinkComment::class);
    }

    /**
     * The users who have upvoted this link.
     */
    public function voters(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'link_votes')->withTimestamps();
    }

    /**
     * Casts for the model attributes.
     */
    protected function casts(): array
    {
        return [
        ];
    }
}
