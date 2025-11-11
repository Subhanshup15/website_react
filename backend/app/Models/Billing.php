<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    protected $fillable = ['patient_id','amount','discount','final_amount'];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}

