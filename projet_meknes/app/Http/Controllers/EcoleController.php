<?php

namespace App\Http\Controllers;

use App\Models\cycle;
use App\Models\ecole;
use App\Models\niveau;
use App\Models\specialite;
use Illuminate\Http\Request;

class EcoleController extends Controller
{



    public function getCycles($ecole_id)
    {
        $cycles = cycle::where('id_ecole', $ecole_id)->get();
        return response()->json($cycles);
    }

    public function getNiveaux($cycle_id)
    {
        $niveaux = niveau::where('id_cycle', $cycle_id)->get();
        return response()->json($niveaux);
    }

    public function getSpecialtes($niveau_id)
    {
        $specialtes = specialite::where('id_niveau', $niveau_id)->get();
        return response()->json($specialtes);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ecole::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($nom)
    {


   $cycle = cycle::all();



foreach($cycle as $cyc){

if($ec->id_ecole=== $cyc->id_ecole)

    return $cyc->libelle;

}



    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
