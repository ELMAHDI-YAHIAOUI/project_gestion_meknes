<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    
    public function index()
    {
     return product::all() ;
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
        product::create($request->post());
         return response()->json("seccses ");
    }

    /**
     * Display the specified resource.
     */
    public function show(product $product)
    {
        return response()->json([
            "product" => $product
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(product $product)
    {


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, product $product)
    {
        $product->update($request->all());
        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(product $product)
    {
        $product->delete();
        return response()->json("tama 7adfooha ");

    }
}
