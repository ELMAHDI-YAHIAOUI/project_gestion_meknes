<?php

namespace App\Http\Controllers;

use App\Models\cycle;
use Illuminate\Http\Request;

class CycleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return cycle::all();
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(cycle $cycle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(cycle $cycle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, cycle $cycle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(cycle $cycle)
    {
        //
    }
}