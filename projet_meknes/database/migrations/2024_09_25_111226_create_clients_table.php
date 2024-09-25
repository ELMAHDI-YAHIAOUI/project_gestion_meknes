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
        Schema::create('clients', function (Blueprint $table) {
            $table->id("id_client");
            $table->string("nom_complete");
            $table->string("telephone");
            $table->string("niveau");



            $table->unsignedBigInteger('id_ecole');
 $table->foreign("id_ecole")->references("id_ecole")->on("ecoles")->coscadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
