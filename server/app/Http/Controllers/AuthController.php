<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('api',['except'=>['login','register']]);    
    }
    public function login(Request $request){
        // return JWTAuth::parseToken()->authenticate();
        $credentials = $request->only('email','password');
        if(! $token = JWTAuth::attempt($credentials)){
            return response()->json(['error' => 'invalid_credentials'], 400);
        } 

        return $this->respondWithToken($token);
    }

    public function check(Request $request){
        return $request->header();
    }

    public function register(Request $request){
        User::create([
            'username' => $request->username,
            'email'=> $request->email,
            'password' => bcrypt($request->password)
        ]);
        return true;
    }

    protected function respondWithToken($token){
        return response()->json([
            'accessToken' => $token,
            'tokenType' => 'Bearer',
            'expires_in' => 100000
        ]);
    }

}
