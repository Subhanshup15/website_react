<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


   class FeeInvoice extends Model {
    protected $fillable=['student_id','total','paid','due','due_date','status'];
    public function items(){ return $this->hasMany(FeeInvoiceItem::class); }
}

