<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    public function store(Request $r)
    {
        $r->validate([
            'batch_id' => 'required',
            'course_id' => 'required',
            'date' => 'required|date',
            'attendance' => 'required|array'
        ]);

        foreach ($r->attendance as $a) {
            Attendance::updateOrCreate(
                [
                    'student_id' => $a['student_id'],
                    'date' => $r->date,
                    'course_id' => $r->course_id,
                    'batch_id' => $r->batch_id
                ],
                [
                    'status' => $a['status']
                ]
            );
        }

        return response()->json(['message' => 'Attendance Saved Successfully ✅']);
    }

    public function report($batch_id, $course_id)
    {
        return Attendance::where('batch_id', $batch_id)
            ->where('course_id', $course_id)
            ->with('student')
            ->get();
    }
}