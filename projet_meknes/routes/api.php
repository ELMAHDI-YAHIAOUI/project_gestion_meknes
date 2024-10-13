<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CycleController;
use App\Http\Controllers\EcoleController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Group the login/logout routes under the 'web' middleware for session-based authentication
Route::middleware(['web'])->group(function () {
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});

// Resource routes for product management (if you're building a product API)
Route::resource('product', ProductController::class);
Route::resource('ecoles', EcoleController::class);
Route::resource('cycle', CycleController::class);

// routes/api.php
Route::get('ecole/{ecole_id}/cycles', [EcoleController::class, 'getCycles']);
Route::get('cycle/{cycle_id}/niveaux', [EcoleController::class, 'getNiveaux']);
Route::get('niveau/{niveau_id}/specialtes', [EcoleController::class, 'getSpecialtes']);
