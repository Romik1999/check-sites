<?php

namespace Database\Seeders;

use App\Models\Site;
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
        Site::upsert([
                [
                    'url' => 'https://nizhny-newgorod-bfl.ru',
                    'active' => true,
                    'created_at' => now(),
                ],

                [
                    'url' => 'https://bankrot-middle-rf.ru',
                    'active' => true,
                    'created_at' => now(),
                ],

                [
                    'url' => 'https://bfl-smr.ru',
                    'active' => true,
                    'created_at' => now(),
                ],
            ],
            ['url'],
            ['active']
        );
    }
}
