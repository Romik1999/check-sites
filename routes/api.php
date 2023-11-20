<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SitesController;
use App\Http\Controllers\Api\LogsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('logs', LogsController::class)->only(['index', 'show', 'destroy']);
    Route::apiResource('sites', SitesController::class)->except(['show']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

