<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeePayment extends Model
{
        protected $fillable=['fee_invoice_id','amount','method','paid_at'];

}
