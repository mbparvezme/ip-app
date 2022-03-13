<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IPModel;
use App\Models\LogModel;
use \App\Helper\Helper;

class ApiController extends Controller
{
    /**
     * Display a listing of the IPs.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ips = IPModel::orderBy('id', 'Desc')->get();
        return response()->json($ips, 200);
    }

    /**
     * Store a IP in database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $H = new Helper();
      if($request->ip == ""){
        return response()->json($H->result(true,"Please enter a valid IP address."), 401);
      }
      $ip = IPModel::create(['ip' => $request->ip, 'label' => $request->label]);
      if($ip){
        return response()->json($H->result(false, 'IP added successfully', $ip), 201);
      }
      return response()->json($H->result(), 401);
    }

    /**
     * Update the specified IP in database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $H = new Helper();
      $ip = IPModel::find($id);

      if(!$ip || !$request->user){
        return response()->json($H->result(true, "Invalid request!"), 403);
      }

      $ip->label = $request->label;

      if(!$ip->save()){
        return response()->json($H->result(), 403);
      }
      
      $log = LogModel::where(['item_type' => 'ip', 'item' => $id])->first();
      
      $val['data']['oldLabel']  = $request->oldLabel;
      $val['data']['newLabel']  = $request->label;
      $val['time'] = time();
      $val['user'] = $request->user;
      
      if($log){
        $currentData = json_decode($log->data);
        $currentData[] = $val;
        $log->data = $currentData;
        $log->save();
      }else{
        LogModel::create([
          'item_type' => 'ip',
          'item' => $id,
          'data' => json_encode([$val])
        ]);
      }
      return response()->json($H->result(false, 'Successfully updated', $ip), 200);
    }

    public function getLogs()
    {
      $logModel = new LogModel();
      $logs = $logModel->getLog();
      return response()->json($logs, 200);
    }

    public function fallBack(){
        return response('The resource you are looking for is unavailable!', 404);
    }
}
