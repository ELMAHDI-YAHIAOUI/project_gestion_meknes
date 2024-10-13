<?php
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





Route::apiResource('product', ProductController::class);

Route::post('/register', [AuthController::class, 'Register'])->name("register");

Route::post('/login', [AuthController::class, 'Login']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'Logout']);

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




