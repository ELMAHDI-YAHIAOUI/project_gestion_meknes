<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Commande;
use App\Models\ecole;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Logique pour afficher une liste de commandes (si nécessaire)
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Logique pour afficher un formulaire de création (si nécessaire)
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données de la requête
        $validatedData = $request->validate([
            'nom_complet' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
            'niveau' => 'required|string|max:50',
            'ecole' => 'required|string|max:255',
            'specialite' => 'required|string|max:100',
            'cycle' => 'required|string|max:50',
            'qualite' => 'required|string|max:50',
            'commandes' => 'required|array|min:1',
            'id_ecole' => 'required|integer', // Assurez-vous que id_ecole est requis
        ]);

        try {
            // Démarrer une transaction pour s'assurer que tout est cohérent
            \DB::beginTransaction();

            // Récupérer ou créer l'école
            $ecole = Ecole::where('nom_ecole', $validatedData['ecole'])->first();

            if (!$ecole) {
                // Annuler la transaction si l'école n'est pas trouvée
                \DB::rollBack();
                return response()->json(['message' => 'École non trouvée'], 404);
            }

            // Créer un nouveau client
            $client = Client::create([
                'nom_complet' => $validatedData['nom_complet'] ?? 'Nom inconnu',
                'telephone' => $validatedData['telephone'],
                'niveau' => $validatedData['niveau'],
                'ecole' => $validatedData['ecole'],
                'specialite' => $validatedData['specialite'],
                'cycle' => $validatedData['cycle'],
                'id_ecole' => $validatedData['id_ecole'],
            ]);


            // Créer une nouvelle commande associée au client
            $commande = Commande::create([
                'commandeDate' => now(),
                'qualite' => $validatedData['qualite'],
                'commande' => json_encode($validatedData['commandes']), // Sauvegarder en format JSON
                'id_client' => $client->id_client, // Utiliser l'ID du client créé

            ]);

            // Valider et valider la transaction
            \DB::commit();

            // Retourner une réponse JSON avec les détails
            return response()->json([
                'client' => $client,
                'commande' => $commande,
                'message' => 'Commande créée avec succès',
            ], 201);

        } catch (\Exception $e) {
            // Annuler la transaction en cas d'erreur
            \DB::rollBack();

            // Retourner une réponse d'erreur
            return response()->json([
                'message' => 'Une erreur s\'est produite lors de la création de la commande.',
                'error' => $e->getMessage(), // Pour déboguer
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Commande $commande)
    {
        // Logique pour afficher une commande spécifique
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commande $commande)
    {
        // Logique pour afficher un formulaire d'édition (si nécessaire)
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commande $commande)
    {
        // Logique pour mettre à jour une commande spécifique
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commande $commande)
    {
        // Logique pour supprimer une commande spécifique
    }
}
