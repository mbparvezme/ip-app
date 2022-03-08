<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  public function index(Request $request)
  {
    if($request->email == "" || $request->password == ""){
      return response()->json([
        'error' => true,
        'message' => 'Please enter user ID and password!'
      ], 401);
    }

    $user = User::where('email', $request->email)->first();
    if(!$user || !Hash::check($request->password, $user->password)) {
      return response()->json([
        'error' => true,
        'message' => 'Invalid user ID or password'
      ], 401);
    }

    $token = $user->createToken('token')->plainTextToken;
    return response()->json([$user, $token], 201);

  }
}
