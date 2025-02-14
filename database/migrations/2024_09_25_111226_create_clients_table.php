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
            $table->id("id_client"); // Primary key
            $table->string('nom_complet')->default('Inconnu'); // Default value for 'nom_complete'
            $table->string('telephone');
            $table->string('niveau');
            $table->string('ecole');
            $table->string('specialite');
            $table->string('cycle');

            // Foreign key column
            $table->unsignedBigInteger('id_ecole'); // Ensure this matches the type of the referenced column

            // Foreign key constraint
            $table->foreign('id_ecole')
                  ->references('id_ecole')
                  ->on('ecoles')
                  ->onDelete('cascade'); // Corrected typo: `coscadeOnDelete` -> `onDelete`

            $table->timestamps(); // Adds `created_at` and `updated_at` columns
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
