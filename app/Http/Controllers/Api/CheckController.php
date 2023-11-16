<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Queue;
use App\Jobs\CheckSitesJob;

class CheckController extends Controller
{
    public function index(Request $request){

        Queue::push(new CheckSitesJob());

        return response()->json(['success' => 'Провека сайтов добавлена в очередь'], 200);
    }
}
