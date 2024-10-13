<?php

namespace App\Models;

use App\Models\client;
use App\Models\etatCommande;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class commande extends Model
{
    use HasFactory;

    protected $fillable =["commande", "qualite", "id_client","id_etatCommande"];
    protected $primaryKey="id_commande";

    public function client(){
        return $this->belongsTo(client::class,'id_client');
}

public function etatCommande(){
    return $this->belongsTo(etatCommande::class,'id_etatCommande');
}

}
