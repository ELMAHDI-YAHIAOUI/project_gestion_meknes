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
        // Validation des données du formulaire
        $validatedData = $request->validate([
            'nom_complet' => 'required|string|max:255',
            'telephone' => 'required|string|max:15',
            'ecole' => 'required|string|max:255',
            'niveau' => 'required|string|max:255',
            'cycle' => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
            'date' => 'required|date',
            'qualite' => 'required|string|max:255',
            'commande' => 'required|string|max:255',
        ]);

        // Création d'un nouvel enregistrement dans la table clients
        $client = Client::create([
            'nom_complet' => $validatedData['nom_complet'],
            'telephone' => $validatedData['telephone'],
            'ecole' => $validatedData['ecole'],
            'niveau' => $validatedData['niveau'],
            'cycle' => $validatedData['cycle'],
            'specialite' => $validatedData['specialite'],
        ]);

        // Création d'un nouvel enregistrement dans la table commande
        Commande::create([
            'orderDate' => now(), // Enregistre la date actuelle
            'qualite' => $validatedData['qualite'],
            'commande' => $validatedData['commande'],
            'client_id' => $client->id, // Ajoutez cette ligne si vous avez une clé étrangère dans la table commande
        ]);

        return response()->json(['message' => 'Commande créée avec succès'], 201);
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
