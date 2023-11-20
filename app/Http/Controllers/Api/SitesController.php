<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Site\IndexRequest;
use App\Http\Requests\Site\StoreRequest;
use App\Http\Requests\Site\UpdateRequest;
use App\Http\Requests\Site\DestroyRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Site;

class SitesController extends Controller
{
    public function index(IndexRequest $request){

        $item = Site::orderBy($request->sort_by ?? 'created_at', $request->order ?? 'desc')->simplePaginate(20);

        return response()->json(['item' => $item]);
    }

    public function store(StoreRequest $request){

        Site::create([
            'url' => $request->url,
            'active' => $request->active,
        ]);

        return response(content: 'Сайт создан', status: Response::HTTP_CREATED);
    }

    public function update(UpdateRequest $request, $site){
        $item = Site::find($site);

        if(!$item)
            return response(content: 'Запись не найдена', status: Response::HTTP_NOT_FOUND);

        $item->update([
            'url' => $request->url,
            'active' => $request->active,
        ]);

        return response(content: 'Запись обновлена');
    }

    public function destroy($site){

        $item = Site::find($site);

        if(!$item)
            return response(content: 'Запись не найдена', status: Response::HTTP_NOT_FOUND);

        $item->delete();

        return response(content: 'Запись удалена', status: Response::HTTP_NO_CONTENT);
    }
}