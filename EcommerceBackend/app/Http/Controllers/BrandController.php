<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    // Get featured brands

    public function featured()
    {
        $brands = Brand::where('is_featured', 'Yes')->get();

        // Add full logo URL
        $brands->transform(function ($brand) {
            $brand->logo_url = asset('storage/brands/' . $brand->logo);
            return $brand;
        });

        return response()->json($brands);
    }
}
