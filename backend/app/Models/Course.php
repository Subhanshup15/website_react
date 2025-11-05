<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
     protected $fillable = ['code', 'name', 'credit'];
     public function batches()
     {
          return $this->belongsToMany(Batch::class, 'batch_course');
     }
     public function teachers()
     {
          return $this->belongsToMany(Teacher::class, 'course_teacher', 'course_id', 'teacher_id');
     }
}
