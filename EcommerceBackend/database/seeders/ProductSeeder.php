<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // Required for DB::table
use Illuminate\Support\Str;        // Required for Str::random()
use Carbon\Carbon;                 // Required for Carbon::now()

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('product_info')->insert([
            [
                'category_id'    => 1,
                'brand_id'       => null,
                'sku'            => 'AVE00116',
                'product_name'   => 'Business Machines & Accessories',
                'description'    => 'Essential office machines and accessories for business needs.',
                'price'          => 199.99,
                'product_size'   => 'Standard',
                'weight'         => 2.5,
                'height'         => 15.0,
                'length'         => 20.0,
                'width'          => 10.0,
                'is_recycled'    => 'No',
                'is_returnable'  => 'Yes',
                'is_special'     => 'No',
                'is_featured'    => 'Yes',
                'taxable'        => 'Yes',
                'upc'            => Str::random(12),
                'unit_of_measure'=> 'pcs',
                'stock_quantity' => 50,
                'created_at'     => Carbon::now(),
                'updated_at'     => Carbon::now(),
            ],
            [
                'category_id'    => 1,
                'brand_id'       => null,
                'sku'            => 'AVE00117',
                'product_name'   => 'Computer Supplies',
                'description'    => 'Accessories and consumables for computer systems.',
                'price'          => 49.99,
                'product_size'   => 'Medium',
                'weight'         => 1.2,
                'height'         => 10.0,
                'length'         => 15.0,
                'width'          => 5.0,
                'is_recycled'    => 'Yes',
                'is_returnable'  => 'Yes',
                'is_special'     => 'No',
                'is_featured'    => 'No',
                'taxable'        => 'Yes',
                'upc'            => Str::random(12),
                'unit_of_measure'=> 'box',
                'stock_quantity' => 100,
                'created_at'     => Carbon::now(),
                'updated_at'     => Carbon::now(),
            ],
            [
                'category_id'    => 1,
                'brand_id'       => null,
                'sku'            => 'AVE00118',
                'product_name'   => 'Consumer Electronics & Accessories',
                'description'    => 'Latest electronics and related accessories.',
                'price'          => 299.99,
                'product_size'   => 'Large',
                'weight'         => 5.0,
                'height'         => 25.0,
                'length'         => 30.0,
                'width'          => 15.0,
                'is_recycled'    => 'No',
                'is_returnable'  => 'Yes',
                'is_special'     => 'Yes',
                'is_featured'    => 'Yes',
                'taxable'        => 'Yes',
                'upc'            => Str::random(12),
                'unit_of_measure'=> 'pcs',
                'stock_quantity' => 30,
                'created_at'     => Carbon::now(),
                'updated_at'     => Carbon::now(),
            ],
            [
                'category_id'    => 1,
                'brand_id'       => null,
                'sku'            => 'AVE00119',
                'product_name'   => 'Printers, Scanners & Supplies',
                'description'    => 'Printers, scanners, and their accessories.',
                'price'          => 149.99,
                'product_size'   => 'Medium',
                'weight'         => 3.5,
                'height'         => 18.0,
                'length'         => 22.0,
                'width'          => 12.0,
                'is_recycled'    => 'Yes',
                'is_returnable'  => 'Yes',
                'is_special'     => 'No',
                'is_featured'    => 'Yes',
                'taxable'        => 'Yes',
                'upc'            => Str::random(12),
                'unit_of_measure'=> 'pcs',
                'stock_quantity' => 70,
                'created_at'     => Carbon::now(),
                'updated_at'     => Carbon::now(),
            ],
        ]);
    }
}
