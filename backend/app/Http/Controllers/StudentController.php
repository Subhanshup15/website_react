<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    // public function index()
    // {
    //     return Student::orderBy('id', 'desc')->get();
    // }

    public function index()
{
    return Student::with(['batch', 'course'])
        ->orderBy('id', 'desc')
        ->get();
}


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:students',
            'phone' => 'nullable',
            'dob' => 'nullable|date',
            'guardian_name' => 'nullable',
        ]);

        return Student::create($data);
    }

    public function show($id)
    {
        return Student::with(['batch', 'course'])
            ->withCount(['attendance as attendance_present' => function ($q) {
                $q->where('status', 'present');
            }])
            ->withCount(['attendance as attendance_absent' => function ($q) {
                $q->where('status', 'absent');
            }])
            ->with(['marks' => function ($q) {
                $q->latest()->first();
            }])
            ->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:students,email,' . $id,
            'phone' => 'nullable',
            'dob' => 'nullable|date',
            'guardian_name' => 'nullable',
        ]);

        $student->update($data);
        return $student;
    }

    public function destroy($id)
    {
        return Student::destroy($id);
    }
}
