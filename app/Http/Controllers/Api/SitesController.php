<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SitesRequest;
use App\Models\Site;

class SitesController extends Controller
{
    public function index(SitesRequest $request){
        $sites = Site::orderBy($request->sort_by ?? 'created_at', $request->order ?? 'desc')
        ->simplePaginate(20);

        return response()->json(['sites' => $sites]);
    }

    public function store(SitesRequest $request){
       

    }

    public function update(){


    }

    public function destroy(){

    }
}