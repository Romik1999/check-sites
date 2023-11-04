<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SitesRequest;
use Illuminate\Support\Facades\Validator;
use App\Models\Site;

class SitesController extends Controller
{
    public function index(SitesRequest $request){

        $item = Site::orderBy($request->sort_by ?? 'created_at', $request->order ?? 'desc')->simplePaginate(20);

        return response()->json(['item' => $item]);
    }

    public function store(SitesRequest $request){

        if(Site::create($request->all())){
            return response()->json(['success' => 'Успешно'], 200);
        }else{
            return response()->json(['error' => 'Ошибка'], 404);
        }
    }

    public function update(SitesRequest $request, $id){
        
        $item = Site::find($id);

        if(!$item){
            return response()->json(['error' => 'Запись не найдена'], 404);
        }

        $item->update($request->all());

        return response()->json(['success' => 'Запись обновлена'], 200);

    }

    public function destroy(SitesRequest $request, $id){

        $item = Site::find($id);

        if(!$item){
            return response()->json(['error' => 'Запись не найдена'], 404);
        }

        $item->delete();

        return response()->json(['success' => 'Запись удалена']);
    }
}