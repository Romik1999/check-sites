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
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        ];

        if(auth()->attempt($user)){
            $token = auth()->user()->createToken('api_token')->accessToken;
            return response()->json(['name' => $request->name, 'token' => $token]);
        }else{
            return response()->json(['error' => 'Неверные данные'], 401);
        }
    }

    public function logout(Request $request){
        
        if($request->user()){
            $request->user()->tokens()->delete();
        }

        return response()->json(['success' =>'Успшено вышли из системы'], 200);
    }
}
