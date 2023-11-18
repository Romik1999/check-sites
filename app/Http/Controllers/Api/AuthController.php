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

        $userCredentails = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if(auth()->attempt($userCredentails)){
            $user = auth()->user();
            $tokenResult = $user->createToken('api_token');

            return response()->json(['name' => $user->name, 'token' => $tokenResult->accessToken]);
        }else{
            return response()->json(['error' => 'Неверные данные'], 401);
        }
    }

    public function logout(Request $request){

        $this->middleware('logout.middleware');
        
        if($request->user()){
            $request->user()->tokens()->delete();
        }

        return response()->json(['success' =>'Успшено вышли из системы'], 200);
    }
}