<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'commandeDate',
        'qualite',
        'commande',
        'id_client',
    ];

    // Relation avec le client
    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client');
    }
}

// public function etatCommande(){
//     return $this->belongsTo(etatCommande::class,'id_etatCommande');
// }
