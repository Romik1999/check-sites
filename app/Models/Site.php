<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'url',
        'active',
    ];

    public function scopeActive(Builder $query): void
    {
        $query->where('active', true);
    } // scopeActive
}
