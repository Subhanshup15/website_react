<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherCourseController extends Controller
{
    public function show($teacher_id)
    {
        $teacher = Teacher::with('courses')->findOrFail($teacher_id);
        return response()->json($teacher->courses);
    }

    public function update(Request $request, $teacher_id)
    {
        $teacher = Teacher::findOrFail($teacher_id);

        // Accept empty or filled arrays
        $validated = $request->validate([
            'course_ids' => 'array',
            'course_ids.*' => 'exists:courses,id',
        ]);

        // Get course_ids or default to empty (for removing)
        $course_ids = $validated['course_ids'] ?? [];

        // Sync handles add + remove automatically
        $teacher->courses()->sync($course_ids);

        return response()->json(['message' => 'Courses updated successfully']);
    }
}
