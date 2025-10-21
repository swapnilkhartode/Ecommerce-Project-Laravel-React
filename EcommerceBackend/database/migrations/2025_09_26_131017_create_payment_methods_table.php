<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('type');
            $table->string('cardholder')->nullable();
            $table->string('details'); // card no / UPI Id  / PayPal email 
            $table->string('expiry')->nullable();
            $table->string('cvv')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('cust_users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_methods');
    }
};
