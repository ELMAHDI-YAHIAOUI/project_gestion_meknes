<?php

namespace App\Models;

use App\Models\client;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ecole extends Model
{
    use HasFactory;
    protected $primaryKey="id_ecole";



    public function client(){
        return $this->hasMany(client::class,'id_client');
}

}
