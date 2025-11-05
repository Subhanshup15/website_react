<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mark;

class MarkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $r){
        foreach($r->marks as $m){
            Mark::updateOrCreate(
                ['exam_id'=>$r->exam_id, 'student_id'=>$m['student_id']],
                ['marks_obtained'=>$m['marks_obtained']]
            );
        }
        return response()->json(['message'=>'Marks Saved ✅']);
    }

    public function get($exam_id){
        return Mark::where('exam_id',$exam_id)->with('student')->get();
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
        //
    }
}
