<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;
use App\Notifications\TelegramNotification;
use Illuminate\Support\Facades\Http;
use Spatie\Valuestore\Valuestore;
use Illuminate\Database\Eloquent\Model;
use App\Models\Log;

class CheckSitesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $site;

    /**
     * Create a new job instance.
     */
    public function __construct($site)
    {
        $this->site = $site;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $settings = Valuestore::make(storage_path('app/settings.json'));
        $check_enabled = $settings->get('check_enabled');

        if($check_enabled === 0){
            $response = Http::get($this->site->url);

            $log = new Log([
                'site_id' => $this->site->id,
                'response_code' => $response->status(),
                'response_body' => $response->body(),
            ]); 

            $log->save();
            
            \Log::channel('check_log_success')->info('Проверка сайтов успешно работает');
        }else{

            \Log::channel('check_log_error')->info('Обнаружена ошибка при проверке сайтов');

            Notification::route('telegram', env('TELEGRAM_CHAT_ID'))->notify(new TelegramNotification);
        }
    }
}
