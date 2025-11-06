<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
   protected $fillable = ['batch_id', 'course_id', 'student_id', 'date', 'status'];

   public function student()
   {
      return $this->belongsTo(Student::class, 'student_id');
   }

   public function batch()
   {
      return $this->belongsTo(Batch::class, 'batch_id');
   }

   public function course()
   {
      return $this->belongsTo(Course::class, 'course_id');
   }
}
