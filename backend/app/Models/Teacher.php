<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'qualification', 'department'
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_teacher','teacher_id', 'course_id');
    }
}
