<?php 

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ProductInfo;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Fetch all parent categories with nested subcategories
    public function index()
    {
        $categories = Category::whereNull('parent_category_id')
            ->with('subcategories.subcategories') // eager load nested
            ->get();
        
        return response()->json($categories);
    }

    // Fetch top-level categories only
    public function topCategories()
    {
        $categories = Category::whereNull('parent_category_id')->get();
        return response()->json($categories);
    }

    private function getCategoryBreadcrumbs($category_id)
{
    $breadcrumbs = [];

    // loop upwards until no parent
    while ($category_id) {
        $category = Category::find($category_id);

        if ($category) {
            $breadcrumbs[] = [
                'id' => $category->category_id,
                'name' => $category->category_name,
            ];
            $category_id = $category->parent_category_id;
        } else {
            break;
        }
    }

    // reverse so parent -> child
    return array_reverse($breadcrumbs);
}


    // Fetch products for a given category
     public function getCategoryProducts($category_id)
{
    // Breadcrumbs
    $breadcrumbs = $this->getCategoryBreadcrumbs($category_id);

    // Check for subcategories
    $subcategories = Category::where('parent_category_id', $category_id)->get();

    if ($subcategories->isNotEmpty()) {
        $products = [];

        foreach ($subcategories as $subcategory) {
            $product = ProductInfo::where('category_id', $subcategory->category_id)
                ->with(['images' => function($q) {
                    $q->where('is_main', 1);
                }])
                ->first(); // Only one product per subcategory

            if ($product) {
                $products[] = [
                    'subcategory_id'   => $subcategory->category_id,
                    'subcategory_name' => $subcategory->category_name,
                    'product' => [
                        'product_name' => $product->product_name,
                        'image_url' => $product->images->first()?->image_url ?? null
                    ]
                ];
            }
        }

        return response()->json([
            'type' => 'category_preview',
            'breadcrumbs' => $breadcrumbs,
            'data' => $products
        ]);
    }

    // No subcategories: return all products for this category
    $products = ProductInfo::where('category_id', $category_id)
        ->with(['images' => function($q) {
            $q->where('is_main', 1);
        }])
        ->get();

    $products = $products->map(function($product) {
        return [
            'product_name' => $product->product_name,
            'description' => $product->discription,
            'price'=> $product->price,
            'image_url' => $product->images->first()?->image_url ?? null
        ];
    });

    return response()->json([
        'type' => 'product_listing',
        'breadcrumbs' => $breadcrumbs,
        'data' => $products
    ]);
}
}
?>