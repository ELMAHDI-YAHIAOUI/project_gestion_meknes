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
            $table->id('id_commande'); // Clé primaire auto-incrémentée
            $table->dateTime('commandeDate')->default(now()); // Date actuelle par défaut
            $table->string('qualite');
            $table->json('commande'); // Stocker les commandes au format JSON
            $table->unsignedBigInteger('id_client'); // Clé étrangère vers la table clients
            $table->timestamps();

            // Définir les clés étrangères
            $table->foreign('id_client')
                  ->references('id_client')
                  ->on('clients')
                  ->onDelete('cascade'); // Supprimer les commandes si le client est supprimé

            // $table->foreign('id_etatCommande')
            //       ->references('id_etatCommande')
            //       ->on('etat_commandes')
            //       ->onDelete('cascade'); // Supprimer les commandes si l'état est supprimé
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
