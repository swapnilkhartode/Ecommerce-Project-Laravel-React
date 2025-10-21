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
       Schema::create('categories', function (Blueprint $table) {
    $table->bigIncrements('category_id'); // changed from id() to category_id
    $table->string('category_name');
    $table->unsignedBigInteger('parent_category_id')->nullable();
    $table->foreign('parent_category_id')
          ->references('category_id')  // reference the new column
          ->on('categories')
          ->onDelete('cascade');
    $table->timestamps();
});


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
