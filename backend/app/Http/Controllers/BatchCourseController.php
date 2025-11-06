<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use Illuminate\Http\Request;

class BatchCourseController extends Controller
{
    public function show($batch_id)
    {
        return Batch::with('courses')->findOrFail($batch_id);
    }

    public function assign(Request $request, $batch_id)
    {
        $data = $request->validate([
            'course_ids' => 'array',
            'course_ids.*' => 'exists:courses,id',
        ]);

        $batch = Batch::findOrFail($batch_id);
        $batch->courses()->sync($data['course_ids'] ?? []);

        return response()->json(['message' => 'Courses updated successfully']);
    }
}
