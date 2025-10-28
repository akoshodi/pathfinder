<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LinkComment extends Model
{
    /** @use HasFactory<\Database\Factories\LinkCommentFactory> */
    use HasFactory;

    protected $fillable = [
        'link_id',
        'user_id',
        'parent_id',
        'body',
    ];

    public function link(): BelongsTo
    {
        return $this->belongsTo(Link::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(LinkComment::class, 'parent_id');
    }

    protected function casts(): array
    {
        return [
        ];
    }
}
