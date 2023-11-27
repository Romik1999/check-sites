<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LogIndexRequest;
use Illuminate\Http\Request;
use App\Models\Log;
use App\Models\Site;
use Illuminate\Http\Response;

class LogsController extends Controller
{
    public function index(LogIndexRequest $request){

        $logs = Log::with('site:id,url')
            ->select(['id', 'site_id', 'response_code', 'created_at'])
            ->orderBy($request->sort_by ?? 'created_at', $request->order ?? 'desc')
            ->simplePaginate(20);
    
        return response()->json(data: $logs);
    }

    public function show($log){

        $logs = Log::with('site:id,url')->find($log);

        if(!$logs)
            return response(content: 'Лог на найден', status: Response::HTTP_NOT_FOUND);

        return response()->json(['logs' => $logs]);
    }

    public function destroy($log){

        $logs = Log::find($log);

        if(!$logs)
            return response(content: 'Лог на найден', status: Response::HTTP_NOT_FOUND);

        $logs->delete();

        return response(content: 'Лог успешно удален', status: Response::HTTP_NO_CONTENT);
    }
}
