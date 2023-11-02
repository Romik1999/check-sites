<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(AuthRequest $request){

        $user = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if(auth()->attempt($user)){
            $token = auth()->user()->createToken('api_token')->accessToken;
            return response()->json(['token' => $token,], 200);
        }else{
            return response()->json(['error' => 'Неверные данные'], 401);
        }
    }

    public function logout(AuthRequest $request){
        if($request->user()){
            $request->user()->tokens()->delete();
        }

        return response()->json(['Успшено вышли из системы', 200]);
    }
}
