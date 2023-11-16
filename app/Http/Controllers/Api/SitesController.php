<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Site\IndexRequest;
use App\Http\Requests\Site\StoreRequest;
use App\Http\Requests\Site\UpdateRequest;
use App\Http\Requests\Site\DestroyRequest;
use Illuminate\Support\Facades\Validator;
use App\Models\Site;

class SitesController extends Controller
{
    public function index(IndexRequest $request){

        $item = Site::orderBy($request->sort_by ?? 'created_at', $request->order ?? 'desc')->simplePaginate(20);

        return response()->json(['item' => $item]);
    }

    public function store(StoreRequest $request){

        if(Site::create([
            'name' => $request->name,
            'url' => $request->url,
            'active' => $request->active,
        ])){
            return response()->json(['success' => 'Успешно'], 200);
        }else{
            return response()->json(['error' => 'Ошибка'], 404);
        }
    }

    public function update(UpdateRequest $request, $id){
        
        $item = Site::find($id);

        if(!$item){
            return response()->json(['error' => 'Запись не найдена'], 404);
        }

        $item->update($request->all());

        return response()->json(['success' => 'Запись обновлена'], 200);

    }

    public function destroy(DestroyRequest $request, $id){

        $item = Site::find($id);

        if(!$item){
            return response()->json(['error' => 'Запись не найдена'], 404);
        }

        $item->delete();

        return response()->json(['success' => 'Запись удалена']);
    }
}