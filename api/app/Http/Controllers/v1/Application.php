<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\IP as IPModel;
use App\Models\Log as LogModel;

class Application extends Controller
{
  public function index()
  {
      $ips = IPModel::orderBy('id', 'Desc')->get();
      return response()->json($ips, 200);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->all(), ['ip' => 'required|ip']);

    if($validator->fails()){
      return response()->json($this->result(msg: "Please enter a valid IP address."), 401);
    }

    $ip = IPModel::create(['ip' => $request->ip, 'label' => $request->label]);
    if($ip){
      $ips = IPModel::orderBy('id', 'Desc')->get();
      return response()->json($this->result(msg: 'IP added successfully', data: $ips), 201);
    }
    return response()->json($this->result(res: FALSE), 401);
  }

  public function update(Request $request, $id)
  {
    $ip = IPModel::find($id);

    if(!$ip){
      return response()->json($this->result(true, "Invalid request!"), 403);
    }

    $ip->label = $request->label;
    $ip->save();

    $logModel = new LogModel();
    $logModel->addUpdateLog($request, $id);
    return response()->json($this->result(msg: "Updated successfully!"), 201);
  }

  public function getLogs()
  {
    $logModel = new LogModel();
    $logs = $logModel->getLog();
    return response()->json($logs, 200);
  }
}
