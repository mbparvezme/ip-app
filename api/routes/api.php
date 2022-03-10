<?php
use Illuminate\Http\Request;
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

Route::post('/register', [UserController::class, 'index']);
Route::post('/login', [UserController::class, 'index']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    
    Route::get('/', [IPController::class, 'index']);
    Route::post('/', [IPController::class, 'store']);
    Route::put('/{id}', [IPController::class, 'update']);
    Route::delete('/{id}', [IPController::class, 'destroy']);
    Route::get('/log', [LogController::class, 'index']);
    Route::get('/logout', [UserController::class, 'logout']);

});



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


