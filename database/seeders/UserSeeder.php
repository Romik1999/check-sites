<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::firstOrCreate(
            ['email' => '1@1.ru'],
            [
                'name' => 'Example',
                'email' => '1@1.ru',
                'password' => Hash::make('123456'),
                'email_verified_at' => now(),
            ]);
    }
}
