<?php

namespace App\Http\Controllers;

use App\Models\FeeInvoice;
use App\Models\FeePayment;
use Illuminate\Http\Request;


class FeePaymentController extends Controller
{
  public function store(Request $r){
    $data = $r->validate([
        'fee_invoice_id'=>'required',
        'amount'=>'required|numeric',
        'method'=>'nullable'
    ]);

    $invoice = FeeInvoice::find($r->fee_invoice_id);

    FeePayment::create([
        'fee_invoice_id'=>$invoice->id,
        'amount'=>$r->amount,
        'method'=>$r->method,
        'paid_at'=>now()
    ]);

    $invoice->paid += $r->amount;
    $invoice->due = $invoice->total - $invoice->paid;
    $invoice->status = $invoice->due == 0 ? 'paid' : 'partial';
    $invoice->save();

    return response()->json(['message'=>'Payment Recorded ✅']);
}

}
