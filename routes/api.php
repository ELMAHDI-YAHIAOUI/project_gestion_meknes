<?php
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\CycleController;
use App\Http\Controllers\EcoleController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'Register'])->name("register");

Route::post('/login', [AuthController::class, 'Login']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'Logout']);

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::resource('product', ProductController::class);
Route::resource('ecoles', EcoleController::class);
Route::resource('cycle', CycleController::class);
Route::resource('ecoles', EcoleController::class);
Route::get('ecole/{ecole_id}/cycles', [EcoleController::class, 'getCycles']);
Route::get('cycle/{cycle_id}/niveaux', [EcoleController::class, 'getNiveaux']);
Route::get('niveau/{niveau_id}/specialtes', [EcoleController::class, 'getSpecialtes']);



Route::post('/api/commandes', [CommandeController::class, 'store']);
Route::post('/api/test', [CommandeController::class, 'test']);
Route::post('/formTest', [formTestController::class, 'store']);
