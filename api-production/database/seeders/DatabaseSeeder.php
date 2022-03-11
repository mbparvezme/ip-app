<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    // \App\Models\User::factory(2)->create();
    $user = [
      ['name' => 'John Doe', 'email' => 'email1@example.com', 'password' => Hash::make('password1')],
      ['name' => 'Jane Doe', 'email' => 'email2@example.com', 'password' => Hash::make('password2')],
    ];
    $ips = [
      ['ip' => '101.121.102.033', 'label' => 'Label 1'],
      ['ip' => '201.001.022.084', 'label' => 'Label 2'],
      ['ip' => '101.166.062.025', 'label' => 'Label 3'],
      ['ip' => '201.190.082.096', 'label' => 'Label 4'],
    ];
    DB::table('users')->insert($user);
    DB::table('ips')->insert($ips);
  }
}
