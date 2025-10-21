<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
     Schema::create('product_info', function (Blueprint $table) {
    $table->id('product_id');

    // Foreign keys
    $table->unsignedBigInteger('category_id');
    $table->unsignedBigInteger('brand_id')->nullable();

    // Product details
    $table->string('sku')->unique();
    $table->string('product_name');
    $table->text('description')->nullable();
    $table->decimal('price', 10, 2)->default(0.00);

    // Dimensions
    $table->string('product_size')->nullable();
    $table->decimal('weight', 8, 2)->nullable();
    $table->decimal('height', 8, 2)->nullable();
    $table->decimal('length', 8, 2)->nullable();
    $table->decimal('width', 8, 2)->nullable();

    // Flags as ENUM
    $table->enum('is_recycled', ['Yes', 'No'])->default('No');
    $table->enum('is_returnable', ['Yes', 'No'])->default('No');
    $table->enum('is_special', ['Yes', 'No'])->default('No');
    $table->enum('is_featured', ['Yes', 'No'])->default('No');
    $table->enum('taxable', ['Yes', 'No'])->default('Yes');

    // Other
    $table->string('upc')->nullable();
    $table->string('unit_of_measure')->nullable();
    $table->integer('stock_quantity')->default(0);
  //  $table->string('image')->nullable();

    $table->timestamps();

    // 🔗 Foreign Key Constraints
   $table->foreign('category_id')->references('category_id')->on('categories')->onDelete('cascade');
   $table->foreign('brand_id')->references('brand_id')->on('brands')->onDelete('set null');
});



    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_info');
    }
};
