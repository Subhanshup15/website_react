<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    // public function index()
    // {
    //     return Teacher::orderBy('id', 'desc')->get();
    // }

    public function index()
    {
        return Teacher::with('courses')->orderBy('id', 'desc')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:teachers,email',
            'phone' => 'nullable',
            'qualification' => 'nullable',
            'department' => 'nullable',
        ]);

        return Teacher::create($data);
    }

    public function show($id)
    {
        return Teacher::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $teacher = Teacher::findOrFail($id);

        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:teachers,email,' . $id,
            'phone' => 'nullable',
            'qualification' => 'nullable',
            'department' => 'nullable',
        ]);

        $teacher->update($data);

        return $teacher;
    }

    public function destroy($id)
    {
        Teacher::destroy($id);
        return response()->json(['message' => 'Teacher deleted successfully']);
    }
}
