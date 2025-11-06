<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    protected $fillable = ['name', 'year'];
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'batch_course');
    }
}
