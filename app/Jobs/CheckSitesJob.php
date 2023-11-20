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
        if($this->settings->get('check_enabled') !== 1)
            return;

        // Загрузка сайтов
        Site::active()->select(['id', 'name', 'url'])->chunkById(100, function(Collection $sites) {
            $responses = Http::pool(function(Pool $pool) use ($sites){
                return $sites->map(function($site) use ($pool){
                    return $pool->as($site->id)->timeout(15)->retry(3)->get($site->url);
                })->toArray();
            });

            $responses = collect($responses);

            // Запись в БД
            WriteResponsesIntoLog::dispatch(responses: $responses);

            // Рассылка в Telegram
            if($this->settings->get('telegram_enabled') === 1 && !is_null($this->settings->get('telegram_token')) && !is_null($this->settings->get('telegram_chat_id')))
                SendErrorsToTelegram::dispatch(responses: $responses, sites: $sites);
        });
    }
}
