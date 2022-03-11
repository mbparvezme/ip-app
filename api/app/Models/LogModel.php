<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogModel extends Model
{
    use HasFactory;
    protected $table = 'logs';
    protected $fillable = ['ip_id', 'data'];

    public function log()
    {
        return $this->join('ips', 'logs.ip_id', '=', 'ips.id')->select('ip', 'data')->get();
    }

}
