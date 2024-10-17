<?php

namespace App\Http\Controllers;

use App\Models\commande;
use App\Models\client;
use Illuminate\Http\Request;

class CommandeController extends Controller
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
        // Vérifiez les données reçues
        dd($request->all()); // Cela affichera toutes les données que vous avez envoyées

        // Validation des données
        $validatedData = $request->validate([
            'nom_complet' => 'required|string',
            'telephone' => 'required|string',
            'niveau' => 'required|string',
            'ecole' => 'required|string',
            'specialite' => 'required|string',
            'cycle' => 'required|string',
            'qualite' => 'required|string',
            'commandes' => 'required|array', // Assurez-vous que les commandes sont un tableau
        ]);

        try {
            // Créer un client
            $client = Client::create([
                'nom_complete' => $validatedData['nom_complet'],
                'telephone' => $validatedData['telephone'],
                'niveau' => $validatedData['niveau'],
                'ecole' => $validatedData['ecole'],
                'specialite' => $validatedData['specialite'],
                'cycle' => $validatedData['cycle'],
            ]);

            // Créer une commande
            Commande::create([
                'orderDate' => now(),
                'qualite' => $validatedData['qualite'],
                'commande' => json_encode($validatedData['commandes']), // Assurez-vous que cela correspond à votre structure de données
                'client_id' => $client->id,
            ]);

            return response()->json(['message' => 'Commande créée avec succès'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur : ' . $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(commande $commande)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(commande $commande)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, commande $commande)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(commande $commande)
    {
        //
    }
}
