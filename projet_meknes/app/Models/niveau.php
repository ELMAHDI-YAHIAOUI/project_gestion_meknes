<?php

namespace App\Models;

use App\Models\cycle;
use App\Models\ecole;
use App\Models\specialite;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class niveau extends Model
{
    use HasFactory;
    protected $fillable =["id_ecole","libelle"];




public function specialite(){
    return $this->hasMany(specialite::class,'id_specialite');
}


public function cycle(){
    return $this->blengsTo(cycle::class,'id_cycle');
}


}
