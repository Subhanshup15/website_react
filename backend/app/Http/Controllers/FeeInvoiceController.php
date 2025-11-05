<?php

namespace App\Http\Controllers;

use App\Models\FeeInvoice;
use App\Models\FeeInvoiceItem;

use Illuminate\Http\Request;

class FeeInvoiceController extends Controller
{
   public function store(Request $r){
    $data = $r->validate([
        'student_id'=>'required',
        'due_date'=>'required|date',
        'items'=>'required|array'
    ]);

    $invoice = FeeInvoice::create([
        'student_id'=>$r->student_id,
        'due_date'=>$r->due_date
    ]);

    $total = 0;

    foreach($r->items as $i){
        FeeInvoiceItem::create([
            'fee_invoice_id'=>$invoice->id,
            'fee_head_id'=>$i['fee_head_id'],
            'amount'=>$i['amount']
        ]);
        $total += $i['amount'];
    }

    $invoice->update([
        'total'=>$total,
        'due'=>$total
    ]);

    return response()->json($invoice->load('items'),201);
}

}
