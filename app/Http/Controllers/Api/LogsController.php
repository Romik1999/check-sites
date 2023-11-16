<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Log;
use App\Models\Site;

class LogsController extends Controller
{
    public function index(){

        $logs = Log::leftJoin('sites', 'logs.site_id', '=', 'sites.id') 
            ->select('sites.url', 'logs.response_code', 'logs.created_at')
            ->get()
            ->toArray();
    
        return response()->json(['logs' => $logs]);
    }

    public function show($id){

        $logs = Log::find($id);

        if(!$logs){
            return response()->json(['error' => 'Лог на найден'], 404);
        }

        return response()->json(['logs' => $logs]);
    }

    public function destroy($id){

        $logs = Log::find($id);

        if(!$logs){
            return response()->json(['error' => 'Лог на найден'], 404);
        }

        $logs->delete();

        return response()->json(['success' => 'Лог успешно удален']);
    }
}
