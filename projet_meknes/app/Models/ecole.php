<?php

namespace App\Models;

use App\Models\cycle;
use App\Models\client;
use App\Models\niveau;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ecole extends Model
{
    use HasFactory;
    protected $primaryKey="id_ecole";





    public function client(){
        return $this->hasMany(client::class,'id_client');
}

public function cycle(){
    return $this->hasMany(cycle::class,'id_cycle');
}

}
