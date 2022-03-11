<?php
use Illuminate\Support\Facades\Route;

use \App\Http\Controllers\UserController;
use \App\Http\Controllers\IPController;
use \App\Http\Controllers\LogController;

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

Route::get('/{any}', [IPController::class, 'fallBack']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/', [IPController::class, 'index']);
    Route::post('/', [IPController::class, 'store']);
    Route::put('/{id}', [IPController::class, 'update']);
    Route::get('/log', [LogController::class, 'index']);
    Route::get('/logout', [UserController::class, 'logout']);
});