<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SkillProficiency extends Model
{
    use HasFactory;

    protected $fillable = [
        'attempt_id',
        'skill_domain',
        'skill_name',
        'proficiency_level',
        'max_level',
        'proficiency_label',
    ];

    public function attempt(): BelongsTo
    {
        return $this->belongsTo(UserAssessmentAttempt::class, 'attempt_id');
    }

    public function scopeByDomain($query, string $domain)
    {
        return $query->where('skill_domain', $domain);
    }

    public function getProficiencyPercentage(): float
    {
        return ($this->proficiency_level / $this->max_level) * 100;
    }

    public function isStrength(): bool
    {
        return $this->proficiency_level >= ($this->max_level * 0.75);
    }

    public function needsImprovement(): bool
    {
        return $this->proficiency_level < ($this->max_level * 0.5);
    }
}
