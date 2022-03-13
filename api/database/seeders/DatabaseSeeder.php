<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = [
          ['name' => 'John Doe', 'email' => 'user1@email.com', 'password' => Hash::make('password1')],
          ['name' => 'Jane Doe', 'email' => 'user2@email.com', 'password' => Hash::make('password2')],
        ];
        $ips = [
          ['ip' => '101.121.102.033', 'label' => 'Label 1', 'created_at' => Carbon::now()->format('Y-m-d H:i:s')],
          ['ip' => '201.001.022.084', 'label' => 'Label 2', 'created_at' => Carbon::now()->format('Y-m-d H:i:s')],
          ['ip' => '101.166.062.025', 'label' => 'Label 3', 'created_at' => Carbon::now()->format('Y-m-d H:i:s')],
          ['ip' => '201.190.082.096', 'label' => 'Label 4', 'created_at' => Carbon::now()->format('Y-m-d H:i:s')],
        ];
        DB::table('users')->insert($user);
        DB::table('ips')->insert($ips);
    }
}
