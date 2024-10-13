<?php

namespace App\Models;

use App\Models\niveau;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class specialite extends Model
{
    use HasFactory;
     protected $fillable =["libelle","id_niveau"];

     public function niveau(){
        return $this->belongsTo(niveau::class,'id_niveau');
}
}
