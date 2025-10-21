<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductInfo extends Model
{
    use HasFactory;

    protected $table = 'product_info';
    protected $primaryKey = 'product_id';
    
    protected $fillable = [
        'category_id','brand_id','sku','product_name','description','price',
        'product_size','weight','height','length','width','is_recycled',
        'is_returnable','is_special','is_featured','taxable','upc',
        'unit_of_measure','stock_quantity'
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'product_id');
    }

    
    
}
?>
