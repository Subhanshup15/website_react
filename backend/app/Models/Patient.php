<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = ['name', 'gender', 'address', 'phone', 'age'];


    public function billing()
    {
        return $this->hasMany(\App\Models\Billing::class, 'patient_id');
    }

    public function bookings()
    {
        return $this->hasMany(\App\Models\Booking::class, 'patient_id');
    }
}
