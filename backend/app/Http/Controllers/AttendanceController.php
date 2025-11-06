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
            'attendance' => 'required|array',
        ]);

        foreach ($r->attendance as $a) {
            Attendance::updateOrCreate(
                [
                    'student_id' => $a['student_id'],
                    'batch_id' => $r->batch_id,
                    'course_id' => $r->course_id,
                    'date' => $r->date,
                ],
                [
                    'status' => $a['status'],
                ]
            );
        }

        return response()->json(['message' => 'Attendance Saved ✅']);
    }

    public function report($batch_id, $course_id, Request $r)
    {
        return Attendance::with('student')
            ->where('batch_id', $batch_id)
            ->where('course_id', $course_id)
            ->when($r->date, fn($q) => $q->where('date', $r->date))
            ->get();
    }
    public function fetch($batch_id, $course_id, Request $request)
    {
        $date = $request->query('date');

        $attendance = \App\Models\Attendance::where('batch_id', $batch_id)
            ->where('course_id', $course_id)
            ->where('date', $date)
            ->with('student')
            ->get();

        return $attendance;
    }
    public function list(Request $request)
    {
        $query = \App\Models\Attendance::with(['batch', 'course', 'student']);

        if ($request->batch_id) {
            $query->where('batch_id', $request->batch_id);
        }

        if ($request->course_id) {
            $query->where('course_id', $request->course_id);
        }

        if ($request->date) {
            $query->whereDate('date', $request->date);
        }

        return $query->orderBy('date', 'desc')->get();
    }
}
