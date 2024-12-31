<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class formTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)

{
    dd($request->all());
    // Valider les données entrantes
    $validatedData = $request->validate([
        'nom_complet' => 'required|string',
        'telephone' => 'required|string',
        'niveau' => 'required|string',
        'ecole' => 'required|string',
        'specialite' => 'required|string',
        'cycle' => 'required|string',
        'qualite' => 'required|string',
        'commandes' => 'required|string',
    ]);

    try {
        // Créer un nouveau client
        $client = Client::create([
            'nom_complet' => $validatedData['nom_complet'], // Correction du nom de champ
            'telephone' => $validatedData['telephone'],
            'niveau' => $validatedData['niveau'],
            'ecole' => $validatedData['ecole'],
            'specialite' => $validatedData['specialite'],
            'cycle' => $validatedData['cycle'],
        ]);

        // Créer une nouvelle commande
        $commande = Commande::create([ // Correction du nom de variable
            'orderDate' => now(),
            'qualite' => $validatedData['qualite'],
            'commande' => json_encode($validatedData['commandes']),
            'client_id' => $client->id,
        ]);

        // Retourner une réponse JSON
        return response()->json([
            'client' => $client,
            'commande' => $commande,
            'message' => 'Commande créée avec succès'
        ], 201);

    } catch (\Exception $e) {
        // Ne pas utiliser dd() pour la gestion des erreurs en production
        return response()->json(['message' => 'Erreur : ' . $e->getMessage()], 500);
    }
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
