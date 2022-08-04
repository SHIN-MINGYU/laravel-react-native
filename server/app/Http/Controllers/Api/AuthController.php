<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function regist(Request $request){
        $email = $request->email;
        $name = $request->name;
        $password = Hash::make($request->password);
        $user = User::create(['email'=>$email,'name'=>$name,'password'=>$password]);
        $token = $user->createToken('hi')->accessToken;
        return $token;
    }
    public function login(Request $request){
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);
        return $this->createToken($request->email, $request->password);
    }


    public function restoreAccessToken(Request $request){
        $data = [
            'grant_type' => 'refresh_token',
            'refresh_token'=>$request->refreshToken,
            'client_id' => '2',
            'client_secret' => 'jZC0G0RtmoV1K6toGZUqzsBY1mVCa9E6klnhHpMW',
            'scope'=>''
        ];
        $request = Request::create('http://localhost:8000/oauth/token', 'POST', $data);
        return app()->handle($request);
    }

    public function someRequest(Request $request){
        return $request->user();
    }
    public function createToken ($email, $password) {
        $credentials = array(
            'email' => $email,
            'password' => $password
        );

        if (!Auth::attempt($credentials)) {
            return 'login fail';
        }
        $data = [
            'grant_type' => 'password',
            'client_id' => '2',
            'client_secret' => 'jZC0G0RtmoV1K6toGZUqzsBY1mVCa9E6klnhHpMW',
            'username' => $email,
            'password' => $password,
            'scope' => '',
        ];
        $request = Request::create('http://localhost:8000/oauth/token', 'POST', $data);
        $response = app()->handle($request);

        return $response;
    }
}
