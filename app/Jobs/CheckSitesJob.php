<?php

namespace App\Jobs;

use App\Models\Log;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Spatie\Valuestore\Valuestore;
use Illuminate\Http\Client\Pool;
use App\Models\Site;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;

class CheckSitesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $settings;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        $this->settings = ValueStore::make(storage_path('app/settings.json'));
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        if($this->settings->get('check_enabled') === 1) {
            // Загрузка сайтов
            Site::active()->select(['id', 'name', 'url'])->chunkById(100, function(Collection $sites) {
                $responses = Http::pool(function(Pool $pool) use ($sites){
                    return $sites->map(function($site) use ($pool){
                        return $pool->as($site->id)->get($site->url);
                    })->toArray();
                });

                $responses = collect($responses);

                // Запись в БД
                Log::insert($responses->map(function($response, $siteId){
                    if($response instanceof ConnectException || $response instanceof RequestException)
                        return [
                            'site_id' => $siteId,
                            'response_code' => $response->getCode(),
                            'response_body' => $response->getMessage(),
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];

                    return [
                        'site_id' => $siteId,
                        'response_code' => $response->status(),
                        'response_body' => json_encode(value: $response->json(), flags: JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                })->toArray());

                // Рассылка в Telegram
                if($this->settings->get('telegram_enabled') === 1 && $this->settings->get('telegram_token') && $this->settings->get('telegram_chat')){
                    // Выборка неудачных запросов
                    $failed = $responses->filter(function($response){
                        if($response instanceof ConnectException || $response instanceof RequestException)
                            return true;
                        else
                            return $response->failed();
                    });

                    // Выборка сообщений
                    $messages = $failed->map(function($response, $siteId) use ($sites){
                        if($response instanceof ConnectException || $response instanceof RequestException)
                            return $sites->where('id', $siteId)->first()->name . ': ' . $response->getMessage();
                        else
                            return $sites->where('id', $siteId)->first()->name . ': ' . $response->status();
                    });

                    // Склейка сообщений и отправка
                    $seconds = 0;
                    $text = '';

                    foreach ($messages as $message)
                    {
                        if(strlen($text . $message . PHP_EOL) > 4096){
                            // TODO Отправка в Telegram

                            $seconds++;
                            $text = '';
                        }

                        $text .= $message . PHP_EOL;
                    }

                    if(strlen($text) > 0)
                        //TODO Отправка остатков сообщений
                        sleep(1);
                }
            });
        }
    }
}
