<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = ['batch_id','course_id','exam_name','max_marks','date'];

   public function marks()
{
    return $this->hasMany(Mark::class);
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
