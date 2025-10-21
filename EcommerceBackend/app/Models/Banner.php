<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    // ✅ Columns that can be mass-assigned
    protected $fillable = [
        'title',
        'image',
        'status',
    ];

    // ✅ Add a "virtual column" (not stored in DB)
    protected $appends = ['image_url'];

    // ✅ Define the "image_url" accessor
    public function getImageUrlAttribute()
    {
        return asset('storage/' . $this->image);
    }
}
