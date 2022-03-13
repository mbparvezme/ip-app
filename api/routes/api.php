<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use \App\Http\Controllers\AuthController;
use \App\Http\Controllers\ApiController;

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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/', [ApiController::class, 'store']);
    Route::put('/{id}', [ApiController::class, 'update']);
    Route::get('/log', [ApiController::class, 'getLogs']);
    Route::get('/ip', [ApiController::class, 'index']);
    Route::get('/logout', [AuthController::class, 'logout']);
});
Route::get('/{any}', [ApiController::class, 'fallBack']);