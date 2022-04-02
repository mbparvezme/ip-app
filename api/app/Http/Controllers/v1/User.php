<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\CreateRegistrationRequest;

use App\Models\User as UserModel;

class User extends Controller
{
  public function register(CreateRegistrationRequest $request){
    $user = UserModel::create($request->validated());
    $token = $user->createToken('iptoken')->plainTextToken;
    // event(new Registered($user));
    $this->addLog(action: 'REGISTRATION', item: $user->id, data: ['msg' => 'Account created and logged in to the system', 'time' => time()]);
    return response()->json(['user'=>$user,'token'=>$token,'success'=>true,'error'=>false], 201);
  }

  public function login(Request $request){
    if($request->email == "" || $request->password == ""){
      $this->addLog(action:'AUTH_ERR', data: ['email'=>$request->email??""]);
      return response()->json($this->result(FALSE,'Invalid login details'), 401);
    }
    
    $user = UserModel::where( 'email', $request->email)->first();
    
    if(!$user || !Hash::check($request->password, $user->password)) {
      $action = !$user ? '_ERR' : '_TRY';
      $this->addLog(action:'AUTH'.$action, data: ['email'=>$request->email]);
      return response()->json($this->result(FALSE,'Invalid user ID or password'),401);
    }

    $this->addLog(action:'AUTH', item: $user->id, data: ['msg' => 'Logged in to the system', 'time' => time()]);
    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json(['user'=>$user,'token'=>$token,'success'=>true,'error'=>false], 201);
  }

  public function logout(Request $request){
    $this->addLog(action:'AUTH_ENDS', item: auth()->user()->id, data: ['msg' => 'Logged out from the system', 'time' => time()]
  );
    $tres = $request->user()->tokens()->delete();
    return response()->json(['success' => true, 'Successfully logged out' => $tres], 200);
  }

}
