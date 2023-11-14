<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Valuestore\Valuestore;

class SettingsController extends Controller
{
    public function show(){
        $settings = Valuestore::make(storage_path('app/settings.json'));
        $check_enabled = (int)$settings->get('check_enabled');
        $telegram_enabled = (int)$settings->get('telegram_enabled');
        $telegram_token = $settings->get('telegram_token');
        $telegram_chat_id = $settings->get('telegram_chat_id');

        return response()->json([
            'check_enabled' => $check_enabled,
            'telegram_enabled' => $telegram_enabled,
            'telegram_token' => $telegram_token,
            'telegram_chat_id' => $telegram_chat_id,
        ]);
    }

    public function update(TelegramRequest $request){
        $settings = Valuestore::make(storage_path('app/settings.json'));
        $settings->put('check_enabled', $request->check_enabled);
        $settings->put('telegram_enabled', $request->telegram_enabled);
        $settings->put('telegram_token', $request->telegram_token);
        $settings->put('telegram_chat_id', $request->telegram_chat_id);

        return response()->json(['success' => 'Данные успешно обновлены']);
    }
}
