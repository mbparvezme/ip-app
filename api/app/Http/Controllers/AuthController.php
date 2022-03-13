<?php

namespace App\Http\Controllers;

use \App\Models\User;
use \App\Helper\Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\LogModel;

class AuthController extends Controller
{
  // Register new user
  public function register(Request $request)
  {
    $H = new Helper();
    $vlRules = [
      'name' => 'required|string',
      'email' => 'required|string|unique:users,email',
      'password' => 'required|string|confirmed'
    ];

    $validator = Validator::make($request->all(), $vlRules);

    if ($validator->fails()) {
      return response()->json($H->result(true,"validation_err", $validator->messages()), 401);
    }

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => bcrypt($request->password)
    ]);

    if(!$user){
      return response()->json($H->result(), 401);
    }

    LogModel::create([
      'item_type' => 'auth',
      'item' => $user->id,
      'data' => json_encode([
        'data' => "Account created and logged in to the system",
        'time' => time()
      ])
    ]);

    $token = $user->createToken('iptoken')->plainTextToken;
    
    return response()->json([
      'user' => $user,
      'token' => $token,
      'success' => true,
      'error' => false
    ], 201);
  }

  public function login(Request $request)
  {
    $H = new Helper();
    if($request->email == "" || $request->password == ""){
      return response()->json($H->result(true, "Please enter user ID and password!"), 401);
    }

    $user = User::where('email', $request->email)->first();

    if(!$user || !Hash::check($request->password, $user->password)) {
      return response()->json($H->result(true, "Invalid user ID or password"), 401);
    }

    LogModel::create([
      'item_type' => 'auth',
      'item' => $user->id,
      'data' => json_encode([
        'data' => "Logged in to the system",
        'time' => time()
      ])
    ]);

    $token = $user->createToken('iptoken')->plainTextToken;
    return response()->json([
      'user' => $user,
      'token' => $token,
      'success' => true,
      'error' => false
    ], 201);
  }

  public function logout()
  {
    LogModel::create([
      'item_type' => 'auth',
      'item' => auth()->user()->id,
      'data' => json_encode([
        'data' => "Logged out from the system",
        'time' => time()
      ])
    ]);
    auth()->user()->tokens()->delete();
    return response()->json(['success' => true]);
  }

}
