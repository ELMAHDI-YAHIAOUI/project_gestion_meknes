<?php

namespace App\Models;

use App\Models\ecole;
use App\Models\commande;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class client extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom_complete',
        'telephone',
        'niveau',
        'ecole',
        'specialite',
        'cycle',
    ];     protected $primaryKey="id_client";


    public function ecole(){
        return $this->belongsTo(ecole::class,'id_ecole');
}


public function commande(){
    return $this->hasMany(commande::class,'id_commande');
}

}
