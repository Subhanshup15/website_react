<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = ['room_id', 'customer_name', 'check_in', 'check_out'];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
