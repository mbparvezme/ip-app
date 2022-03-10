<?php
namespace App\Http\Controllers;

use \App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  public function index(Request $request)
  {

    // if (!Auth::attempt($request->only('email', 'password'))) {
    //   return response([
    //     'message' => 'Invalid credentials!'
    //   ], Response::HTTP_UNAUTHORIZED);
    // }

    // $user = Auth::user();

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
    // $cookie = cookie('acctkn', $token, 60);
    // return response([$user, $token])->withCookie($cookie);
    return response()->json([$user, $token]);

  }

  public function logout(Request $request)
  {
    $request->user()->token()->revoke();
    return response(['success' => true]);
  }
}
