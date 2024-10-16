<?php

namespace App\Models;

use App\Models\ecole;
use App\Models\niveau;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class cycle extends Model
{
    use HasFactory;

    protected $fillable =["id_ecole","libelle"];


    public function ecole(){
        return $this->belongsTo(ecole::class,'id_ecole');
}

public function niveau(){
    return $this->belongsTo(niveau::class,'id_niveau');
}



}
