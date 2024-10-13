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
        Schema::create('commandes', function (Blueprint $table) {
            $table->id("id_commande");
            $table->string("qualite");
            $table->string("commande");



            $table->unsignedBigInteger('id_client');
 $table->foreign("id_client")->references("id_client")->on("clients")->coscadeOnDelete();


 $table->unsignedBigInteger('id_etatCommande');
 $table->foreign("id_etatCommande")->references("id_etatCommande")->on("etat_commandes")->coscadeOnDelete();





            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
