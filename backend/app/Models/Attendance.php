<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
   protected $fillable = ['batch_id', 'course_id', 'student_id', 'date', 'status'];

   public function student()
   {
      return $this->belongsTo(Student::class);
   }

   public function batch()
   {
      return $this->belongsTo(Batch::class);
   }

   public function course()
   {
      return $this->belongsTo(Course::class);
   }
}
