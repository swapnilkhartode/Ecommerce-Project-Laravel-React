<?php
use App\Http\Controllers\BrandController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\PaymentMethodController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'getProfile']);
    Route::post('/updateprofile', [AuthController::class, 'updateProfile']);
    Route::apiResource('payment-methods', PaymentMethodController::class);

});



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);



Route::get('/categories', [CategoryController::class, 'index']);
Route::get('category-products/{category_id}', [CategoryController::class, 'getCategoryProducts']);

Route::get('/top-categories', [CategoryController::class, 'topCategories']);

Route::post('/subscribe-newsletter', [NewsletterController::class, 'subscribe']);

Route::apiResource('banners', BannerController::class);

Route::get('/brands/featured', [BrandController::class, 'featured']);

 
