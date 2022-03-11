<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\IPModel;
use \App\Models\LogModel;

class IPController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ips = IPModel::orderBy('id', 'Desc')->get();
        return response()->json($ips, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $ip = new IPModel();
        // $ip->ip = $request->ip;
        // $ip->label = $request->label;
        // $ip->save();
        $ip = IPModel::create(['ip' => $request->ip, 'label' => $request->label]);
        return response()->json(['data' => $ip, 'success' => true, 'error' => false], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $ip = IPModel::find($id);
        if(isset($request->label)){
            $ip->label = $request->label;
            $val['data']['oldLabel'] = $request->oldLabel;
            $val['data']['newLabel'] = $request->label;
            $val['action'] = 'update';
        }
        if(isset($request->status)){
            $ip->status = $request->status;
            $val['action'] = 'delete';
        }
        $ip->save();
        
        $log = LogModel::where('ip_id', $id)->first();
        $val['time'] = time();
        $val['user'] = $request->user;
        if($log){
            $currentData = json_decode($log->data);
            $currentData[] = $val;
            $log->ip_id = $id;
            $log->data = $currentData;
            $log->save();
        }else{
            LogModel::create([
                'ip_id' => $id,
                'data' => json_encode([$val])
            ]);
        }

        return response()->json(['data' => $ip, 'success' => true, 'error' => false], 200);
    }

    public function logs()
    {
        $logs = (new LogModel())->log();
        return response()->json($logs, 200);
    }

    public function fallBack(){
        return response()->json('The resource you are looking for is unavailable!', 403);
    }
}
