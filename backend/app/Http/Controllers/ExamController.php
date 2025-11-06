<?php

namespace App\Http\Controllers;

use App\Models\Exam;

use Illuminate\Http\Request;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Exam::with(['batch', 'course'])->orderBy('id', 'desc')->get();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $r)
    {
        return Exam::create($r->validate([
            'batch_id' => 'required',
            'course_id' => 'required',
            'exam_name' => 'required',
            'max_marks' => 'required|numeric',
            'date' => 'required|date'
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Exam::destroy($id);
        return response()->json(['message' => 'Exam deleted successfully']);
    }
}
