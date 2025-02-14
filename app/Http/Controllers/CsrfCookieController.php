<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class CsrfCookieController extends Controller
{
    /**
     * Renvoie un cookie CSRF.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        return response()->json(['message' => 'CSRF cookie set'])->withCookie(
            Cookie::make('XSRF-TOKEN', csrf_token(), 60, '/', null, false, false)
        );
    }
}
