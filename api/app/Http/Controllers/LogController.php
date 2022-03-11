<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\LogModel;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $logs = LogModel::all();
        return response()->json($logs, 200);
    }
}
