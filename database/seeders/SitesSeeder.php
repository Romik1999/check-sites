<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class SitesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i < 10; $i++) {
            DB::table('sites')->insert([
                'name' => 'Example ' . $i,
                'url' => 'http://example-' . $i . '.ru',
                'active' => rand(true, false),
            ]);
        }
    }
}
