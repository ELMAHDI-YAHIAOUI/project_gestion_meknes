<?php

namespace App\Models;

use App\Models\commande;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class etatCommande extends Model
{
    use HasFactory;
    protected $primaryKey = "id_etatCommande" ;
    protected $table = "etat_commandes" ;

//     public function commande(){
//         return $this->hasMany(commande::class,'id_commande');
// }

}
