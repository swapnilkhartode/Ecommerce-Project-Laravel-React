<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Set the table name if it doesn't follow Laravel's naming convention
    protected $table = 'categories';

    // Set the primary key
    protected $primaryKey = 'category_id';

    // Allow mass assignment
    protected $fillable = [
        'category_name',
        'parent_category_id',
    ];

    /**
     * Get the parent category
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_category_id');
    }

    /**
     * Get the child categories
     */
    public function subcategories()
    {
        return $this->hasMany(Category::class, 'parent_category_id');
    }
}
