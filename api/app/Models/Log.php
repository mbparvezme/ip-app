<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;
    protected $fillable = ['action', 'item', 'data'];

    public function addUpdateLog( $request, $id ){
      $val['data']['oldLabel']  = $request->oldLabel;
      $val['data']['newLabel']  = $request->label;
      $val['time'] = time();
      $val['user'] = auth()->user()->id;

      $log = $this->where(['action' => 'IP', 'item' => $id])->first();

      if($log){ // If previous log exists
        $currentData = json_decode($log->data);
        $currentData[] = $val;
        $log->data = $currentData;
        $log->update();
      }
      else $this->create(['action' => 'IP', 'item' => $id, 'data' => json_encode([$val])]);
      return TRUE;
    }

    public function getLog()
    {
      $ipLog = $this->where('action', 'IP')->join('ips', 'logs.item', '=', 'ips.id')
                    ->select('ip', 'data')->get();
      $authLog = $this->where('action', '!=', 'IP')-> join('users', 'logs.item', '=', 'users.id')->select('name', 'data')->get();
      return [
          'ipLog' => $ipLog,
          'authLog' => $authLog
      ];
    }
}
