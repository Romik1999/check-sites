<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_id',
        'response_code',
        'response_header',
        'response_body',
    ];

    const UPDATED_AT = null;

    //
    //  Связи
    //
    public function site(): BelongsTo
    {
        return $this->belongsTo(related: \App\Models\Site::class);
    }
}
