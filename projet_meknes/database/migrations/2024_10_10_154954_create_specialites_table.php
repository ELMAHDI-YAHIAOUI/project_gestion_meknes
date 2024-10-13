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
        Schema::create('specialites', function (Blueprint $table) {
            $table->id("id_specialite");

            $table->string("libelle");
            $table->unsignedBigInteger('id_niveau');
            $table->foreign("id_niveau")->references("id_niveau")->on("niveaux")->coscadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('specialites');
    }
};
