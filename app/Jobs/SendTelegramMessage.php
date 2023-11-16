<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendTelegramMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        private string $message,
    )
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $settings = \Spatie\Valuestore\ValueStore::make(storage_path('app/settings.json'));

        $response = \Illuminate\Support\Facades\Http::post(
            url: 'https://api.telegram.org/bot' . $settings->get('telegram_token') . '/sendMessage',
            data: [
                'chat_id' => $settings->get('telegram_chat_id'),
                'text' => $this->message,
            ],
        );

        if($response->failed())
            \Illuminate\Support\Facades\Log::channel('telegram')->error(
                message: 'Ошибка отправки сообщения в ТГ',
                context: $response->json(),
            );
    }
}
