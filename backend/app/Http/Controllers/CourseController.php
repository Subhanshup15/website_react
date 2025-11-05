<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    /**
     * List all courses
     */
    public function index()
    {
        return Course::orderBy('id', 'desc')->get();
    }

    /**
     * Create a new course
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'code' => 'required|unique:courses,code',
            'name' => 'required',
            'credit' => 'nullable|numeric'
        ]);

        return Course::create($data);
    }

    /**
     * Show one course (used for Edit form)
     */
    public function show($id)
    {
        return Course::findOrFail($id);
    }

    /**
     * Update course
     */
    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $data = $request->validate([
            'code' => 'required|unique:courses,code,' . $id,
            'name' => 'required',
            'credit' => 'nullable|numeric'
        ]);

        $course->update($data);
        return $course;
    }

    /**
     * Delete course
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json(['message' => 'Course deleted']);
    }
}
