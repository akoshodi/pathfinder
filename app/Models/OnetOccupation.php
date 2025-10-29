<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OnetOccupation extends Model
{
    use HasFactory;

    protected $table = 'onet_occupation_data';

    protected $primaryKey = 'onetsoc_code';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'onetsoc_code',
        'title',
        'description',
    ];

    protected $appends = ['slug'];

    public function skills(): HasMany
    {
        return $this->hasMany(OnetSkill::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function abilities(): HasMany
    {
        return $this->hasMany(OnetAbility::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function knowledge(): HasMany
    {
        return $this->hasMany(OnetKnowledge::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function workActivities(): HasMany
    {
        return $this->hasMany(OnetWorkActivity::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function workContext(): HasMany
    {
        return $this->hasMany(OnetWorkContext::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function workStyles(): HasMany
    {
        return $this->hasMany(OnetWorkStyle::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function workValues(): HasMany
    {
        return $this->hasMany(OnetWorkValue::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function interests(): HasMany
    {
        return $this->hasMany(OnetInterest::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(OnetTaskStatement::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function education(): HasMany
    {
        return $this->hasMany(OnetEducationTrainingExperience::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function jobZone(): HasMany
    {
        return $this->hasMany(OnetJobZone::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function technologySkills(): HasMany
    {
        return $this->hasMany(OnetTechnologySkill::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function tools(): HasMany
    {
        return $this->hasMany(OnetTool::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function relatedOccupations(): HasMany
    {
        return $this->hasMany(OnetRelatedOccupation::class, 'onetsoc_code', 'onetsoc_code');
    }

    public function alternateTitles(): HasMany
    {
        return $this->hasMany(OnetAlternateTitle::class, 'onetsoc_code', 'onetsoc_code');
    }

    /**
     * Get the slug for the occupation (URL-friendly version of SOC code).
     */
    public function getSlugAttribute(): string
    {
        return str_replace('.', '-', $this->onetsoc_code);
    }

    /**
     * Scope to search occupations by title or description.
     */
    public function scopeSearch($query, ?string $search)
    {
        if (! $search) {
            return $query;
        }

        return $query->where(function ($q) use ($search) {
            $q->where('title', 'LIKE', "%{$search}%")
                ->orWhere('description', 'LIKE', "%{$search}%");
        });
    }
}
