<?php

namespace App\Http\Controllers;

use App\Models\Mark;
use App\Models\Exam;
use App\Models\Student;
use Illuminate\Http\Request;

class MarkController extends Controller
{
    // ✅ Fetch students + existing marks for given exam
    public function get($exam_id)
    {
        $exam = Exam::findOrFail($exam_id);

        // Get all students in same batch
        $students = Student::where('batch_id', $exam->batch_id)->get();

        // Load existing marks
        $studentsWithMarks = $students->map(function ($student) use ($exam_id) {
            $mark = Mark::where('exam_id', $exam_id)
                        ->where('student_id', $student->id)
                        ->first();

            return [
                'student_id' => $student->id,
                'student' => ['name' => $student->name],
                'marks_obtained' => $mark->marks_obtained ?? null
            ];
        });

        return response()->json([
            'exam' => $exam,
            'students' => $studentsWithMarks
        ]);
    }


    // ✅ Save / Update Marks
    public function store(Request $request)
    {
        $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'marks' => 'required|array'
        ]);

        foreach ($request->marks as $row) {
            Mark::updateOrCreate(
                [
                    'exam_id' => $request->exam_id,
                    'student_id' => $row['student_id']
                ],
                [
                    'marks_obtained' => $row['marks_obtained'] ?? 0
                ]
            );
        }

        return response()->json(['message' => 'Marks saved successfully ✅']);
    }
}
