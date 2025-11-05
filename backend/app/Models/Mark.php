<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mark extends Model
{
        protected $fillable = ['exam_id','student_id','marks_obtained'];

}
