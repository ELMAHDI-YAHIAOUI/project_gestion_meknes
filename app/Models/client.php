<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_complet',
        'telephone',
        'niveau',
        'ecole',
        'specialite',
        'cycle',
        'id_ecole',
    ];

    protected $primaryKey = 'id_client'; // Clé primaire personnalisée

    // Relation avec l'école
    public function ecole()
    {
        return $this->belongsTo(Ecole::class, 'id_ecole');
    }

    // Relation avec les commandes
    public function commandes()
    {
        return $this->hasMany(Commande::class, 'id_client');
    }
}
