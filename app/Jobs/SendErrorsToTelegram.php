<?php

namespace App\Jobs;

use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection as Collection;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class SendErrorsToTelegram implements ShouldQueue
{
    use Dispatchable, SerializesModels;

    private EloquentCollection $sites;
    private Collection $messages;

    public function __construct(
        Collection $responses,
        EloquentCollection $sites,
    )
    {
        // Выборка неудачных запросов
        $failed = $responses->filter(function($response){
            if($response instanceof \GuzzleHttp\Exception\ConnectException || $response instanceof \GuzzleHttp\Exception\RequestException)
                return true;
            else
                return $response->failed();
        });

        // Выборка сообщений
        $this->messages = $failed->map(function($response, $siteId) use ($sites){
            if($response instanceof ConnectException || $response instanceof RequestException)
                return $sites->where('id', $siteId)->first()->name . ': ' . $response->getMessage();
            else
                return $sites->where('id', $siteId)->first()->name . ': ' . $response->status();
        });
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Склейка сообщений и отправка
        $seconds = 0;
        $text = '';

        foreach($this->messages as $message)
        {
            if(strlen($text . $message . PHP_EOL) > 4096) {
                SendTelegramMessage::dispatch($text)->delay($seconds);

                $seconds++;
                $text = '';
            }

            $text .= $message . PHP_EOL;
        }

        // Отправка остатка сообщений
        if(!empty($text) > 0)
            SendTelegramMessage::dispatch($text)->delay($seconds);
    }
}
