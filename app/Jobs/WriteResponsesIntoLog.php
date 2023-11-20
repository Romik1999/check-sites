<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WriteResponsesIntoLog
{
    use Dispatchable, SerializesModels;

    public function __construct(
        private \Illuminate\Support\Collection $responses,
    )
    {
        //
    }

    public function handle(): void
    {
        $formattedData = $this->responses->map(function($response, $siteId){
            if($response instanceof \GuzzleHttp\Exception\ConnectException || $response instanceof \GuzzleHttp\Exception\RequestException)
                return [
                    'site_id' => $siteId,
                    'response_code' => $response->getCode(),
                    'response_body' => $response->getMessage(),
                    'created_at' => now(),
                ];

            return [
                'site_id' => $siteId,
                'response_code' => $response->status(),
                'response_header' => json_encode(value: $response->headers(), flags: JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE),
                'response_body' => json_encode(value: $response->json(), flags: JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE),
                'created_at' => now(),
            ];
        });

        \App\Models\Log::insert($formattedData->toArray());
    }
}
