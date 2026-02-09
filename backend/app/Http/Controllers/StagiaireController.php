<?php

namespace App\Http\Controllers;

use App\Models\Stagiaire;
use Illuminate\Http\Request;

class StagiaireController extends Controller
{
    public function index()
    {
        return Stagiaire::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'email' => 'required|email',
            'filiere' => 'required'
        ]);

        return Stagiaire::create($request->all());
    }

    public function show(string $id)
    {
        return Stagiaire::find($id);
    }

    public function update(Request $request, string $id)
    {
        $stagiaire = Stagiaire::find($id);
        $stagiaire->update($request->all());
        return $stagiaire;
    }

    public function destroy(string $id)
    {
        return Stagiaire::destroy($id);
    }
}