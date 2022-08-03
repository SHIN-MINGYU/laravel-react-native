<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/login',[AuthController::class,'login'])->name('login');
Route::post('/regist',[AuthController::class,'regist'])->name('regist');
Route::post('/restoreToken',[AuthController::class,'restoreAccessToken'])->name('restoreToken');
Route::post('/request',[AuthController::class,'someRequest'])->name('request');