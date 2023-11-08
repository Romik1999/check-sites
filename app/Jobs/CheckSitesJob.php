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
use App\Models\Site;

class CheckSitesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $site;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {

    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $settings = ValueStore::make(storage_path('app/settings.json'));
        $check_enabled = $settings->get('check_enabled');

        if($settings->get('check_enabled') === 1){
            $sites = Site::all();

            foreach($sites as $site){
                $response = Http::get('https://example.com/');

                $log = new Log([
                    'site_id' => $site->id,
                    'response_code' => $response->status(),
                    'response_body' => $response->body(),
                ]);
                $log->save();

                if($response->ok()){
                    $message = 'Проверка сайта ' . $site->url . ' завершилась неудачно. HTTP-статус: ' . $response->status();
                    Notification::route('telegram', env('TELEGRAM_CHAT_ID'))->notify(new TelegramNotification($message));
                    $log = new Log([
                        'site_id' => $site->id,
                        'response_code' => $response->status(),
                        'response_body' => $response->body(),
                    ]);
                    $log->save();
                }
            }
        }else{
            return response()->json('Проверка не включена');
        }
    }
}
