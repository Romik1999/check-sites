<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Valuestore\Valuestore;

class SettingsController extends Controller
{
    public function show(){
        $settings = Valuestore::make(storage_path('app/settings.json'));
        $check_enabled = $settings->get('check_enabled');

        return response()->json(['check_enabled' => $check_enabled]);
    }

    public function update(Request $request){
        $settings = Valuestore::make(storage_path('app/settings.json'));
        $check_enabled = $settings->put('check_enabled', $request->check_enabled);

        return response()->json(['success' => 'Данные успешно обновлены']);
    }
}
