<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use \App\Http\Controllers\v1\Application;
use \App\Http\Controllers\v1\User;

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

Route::prefix('v1')->group(function(){
  Route::post('/register',  [User::class, 'register']);
  Route::post('/login',     [User::class, 'login']);

  Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/',     [Application::class, 'index']);
    Route::post('/',    [Application::class, 'store']);
    Route::put('/{id}', [Application::class, 'update']);
    Route::get('/log',  [Application::class, 'getLogs']);
  
    Route::get('/logout', [User::class, 'logout']);
  });
  
  Route::fallback(function(){echo "404 Page not found..";});
});
Route::fallback(function(){echo "404 Page not found..";});

