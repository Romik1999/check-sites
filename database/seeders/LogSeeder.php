<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Log::firstOrCreate(
            [
                'site_id' => \App\Models\Site::select('id')->first()->id,
                'response_code' => \Illuminate\Http\Response::HTTP_OK,
                'response_header' => json_encode(
                    value: ['header_1' => 'Header 1', 'header_2' => 'Header 2'],
                    flags: JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE
                ),

                'response_body' => json_encode(
                    value: ['parameter_1' => 'Parameter 1', 'parameter_2' => 'Parameter 2'],
                    flags: JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE
                ),
            ]
        );
    }
}
