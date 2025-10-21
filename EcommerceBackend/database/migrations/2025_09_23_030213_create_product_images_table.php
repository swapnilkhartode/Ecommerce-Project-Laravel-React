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
        Schema::create('product_images', function (Blueprint $table) {
            $table->id(); // primary key for this table
            $table->unsignedBigInteger('product_id'); // manually define column
            $table->string('image_path');
            $table->boolean('is_main')->default(false);
            $table->timestamps();
            
            // Foreign key pointing to product_info.product_id
            $table->foreign('product_id')
                  ->references('product_id')
                  ->on('product_info')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_images');
    }
};
