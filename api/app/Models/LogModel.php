<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogModel extends Model
{
    use HasFactory;
    protected $table = 'logs';
    protected $fillable = ['item_type', 'item', 'data'];

    public function getLog()
    {
        $ipLog = $this->where('item_type', 'ip')-> join('ips', 'logs.item', '=', 'ips.id')->select('ip', 'data')->get();
        $authLog = $this->where('item_type', 'auth')-> join('users', 'logs.item', '=', 'users.id')->select('name', 'data')->get();
        return [
            'ipLog' => $ipLog,
            'authLog' => $authLog
        ];
    }

    public function add( $data )
    {
        return $this->create($data);
    }
}
