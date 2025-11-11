<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Billing;

class BillingController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->all();
        $data['final_amount'] = $data['amount'] - ($data['discount'] ?? 0);
        $bill = Billing::create($data);
        return response()->json(['status'=>true,'message'=>'Bill Created','data'=>$bill]);
    }
}
