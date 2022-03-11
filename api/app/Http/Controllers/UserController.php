<?php
namespace App\Http\Controllers;

use \App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

  // Register new user
  public function register(Request $request)
  {
    $fields = $request->validate([
      'name' => 'required|string',
      'email' => 'required|string|unique:users,email',
      'password' => 'required|string|confirmed'
    ]);

    $user = User::create([
      'name' => $fields['name'],
      'email' => $fields['email'],
      'password' => bcrypt($fields['password'])
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
    // if (!Auth::attempt($request->only('email', 'password'))) {
    //   return response([
    //     'message' => 'Invalid credentials!'
    //   ], Response::HTTP_UNAUTHORIZED);
    // }
    // $user = Auth::user();

    if($request->email == "" || $request->password == ""){
      return response()->json([
        'error' => true, 'success' => false, 'message' => 'Please enter user ID and password!'
      ], 401);
    }

    $user = User::where('email', $request->email)->first();

    if(!$user || !Hash::check($request->password, $user->password)) {
      return response()->json([
        'error' => true, 'success' => false, 'message' => 'Invalid user ID or password'
      ], 401);
    }

    $token = $user->createToken('iptoken')->plainTextToken;
    return response()->json([
      'user' => $user,
      'token' => $token,
      'success' => true,
      'error' => false
    ], 201);
    // $cookie = cookie('acctkn', $token, 60);
    // return response([$user, $token])->withCookie($cookie);
  }

  public function logout()
  {
    auth()->user()->tokens()->delete();
    return response()->json(['success' => true]);
  }
}
