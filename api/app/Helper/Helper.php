<?php
namespace App\Helper;

class Helper {

  public function result(bool $err = true, String $msg = "Something went wrong!", $data = false) : array
  {
    $res['success'] = !$err;
    $res['error']   = $err;
    $res['message'] = $msg;
    if($data){
      $res['data'] = $data;
    }
    return $res;
  }

}