<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ecole extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_ecole'; // Clé primaire personnalisée

    // Relation avec les clients
    public function clients()
    {
        return $this->hasMany(Client::class, 'id_ecole');
    }
}
