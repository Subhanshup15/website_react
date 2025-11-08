<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use App\Models\Student;
use App\Models\Attendance;
use App\Models\Exam;
use Illuminate\Http\Request;

class StudentPanelController extends Controller
{
    public function myCourses(Request $request)
    {
        $student = $request->user();
        return $student->batch?->courses ?? [];
    }

    public function myBatch(Request $request)
    {
        $student = $request->user();
        return $student->load('batch', 'batch.students');
    }

    public function myAttendance(Request $request)
    {
        $student = $request->user();
        return Attendance::with(['batch', 'course'])
            ->where('student_id', $student->id)
            ->orderBy('date', 'desc')
            ->get();
    }

    public function myMarks(Request $request)
    {
        $student = $request->user();

        return DB::table('marks')
            ->join('exams', 'marks.exam_id', '=', 'exams.id')
            ->join('courses', 'exams.course_id', '=', 'courses.id')
            ->select(
                'exams.exam_name',
                'exams.date',
                'exams.max_marks',
                'courses.name as course',
                'marks.marks_obtained'
            )
            ->where('marks.student_id', $student->id)
            ->orderBy('exams.date', 'desc')
            ->get();
    }
}
