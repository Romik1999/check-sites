<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingsUpdateRequest;
use Illuminate\Http\Request;
use Spatie\Valuestore\Valuestore;

class SettingsController extends Controller
{
    private $settings;

    public function __construct()
    {
        $this->settings = Valuestore::make(storage_path('app/settings.json'));
    }

    public function index()
    {
        return response()->json(data: [
            'check_enabled' => $this->settings->get('check_enabled'),
            'telegram_enabled' => $this->settings->get('telegram_enabled'),
            'telegram_token' => $this->settings->get('telegram_token'),
            'telegram_chat_id' => $this->settings->get('telegram_chat_id'),
        ]);
    }

    public function update(SettingsUpdateRequest $request)
    {
        $this->settings->put([
            'check_enabled' => $request->check_enabled,
            'telegram_enabled' => $request->telegram_enabled,
            'telegram_token' => $request->telegram_token,
            'telegram_chat_id' => $request->telegram_chat_id,
        ]);

        return response('Настройки сохранены');
    }
}
