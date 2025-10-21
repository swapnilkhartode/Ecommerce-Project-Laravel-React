<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //  DB::table('categories')->insert([
        // ['category_name' => 'Technology', 'parent_category_id' => null],
        // ['category_name' => 'FURNITURE & INTERIORS', 'parent_category_id' => null],
        // ['category_name' => 'SCHOOL SUPPLIES', 'parent_category_id' => null],
        // ['category_name' => 'HOME & KITCHEN', 'parent_category_id' => null], 
        // ['category_name' => 'Fashion', 'parent_category_id' => null]
        // ]);

        $technology = DB::table('categories')
            ->where('category_name', 'Technology')
            ->first();

        if ($technology) {
            $technologyId = $technology->category_id;

            // Insert subcategories for Technology
            DB::table('categories')->insert([
                ['category_name' => 'Business Machines & Accessories', 'parent_category_id' => $technologyId],
                ['category_name' => 'Computer Supplies', 'parent_category_id' => $technologyId],
                ['category_name' => 'Consumer Electronics & Accessories', 'parent_category_id' => $technologyId],
                ['category_name' => 'Printers, Scanners & Supplies', 'parent_category_id' => $technologyId],
            ]);
        } else {
            echo "Technology category not found!";
        }

          $computer_supplies = DB::table('categories')
            ->where('category_name', 'Computer Supplies')
            ->first();

            if ($computer_supplies) {
            $computer_supplies_id = $computer_supplies->category_id;

            // Insert subcategories for Technology
            DB::table('categories')->insert([
                ['category_name' => 'Computer/ Laptop Accessories', 'parent_category_id' => $computer_supplies_id],
                ['category_name' => 'Disc & Media', 'parent_category_id' => $computer_supplies_id],
                ['category_name' => 'Hard Drives', 'parent_category_id' => $computer_supplies_id],
                ['category_name' => 'Keyboard & mic', 'parent_category_id' => $computer_supplies_id],
                ['category_name' => 'Media Storage', 'parent_category_id' => $computer_supplies_id],
                ['category_name' => 'Moniter', 'parent_category_id' => $computer_supplies_id],
                ['category_name' => 'Networking & wifi Accesories', 'parent_category_id' => $computer_supplies_id],
            ]);
        } else {
            echo "Technology category not found!";
        }


}
}
