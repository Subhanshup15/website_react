<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use Illuminate\Http\Request;
use App\Models\Course;

class BatchController extends Controller
{
    public function index()
    {
        return Batch::with('courses')->orderBy('id', 'desc')->get();

    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'year' => 'nullable'
        ]);

        return Batch::create($data);
    }

    public function show($id)
    {
        return Batch::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $batch = Batch::findOrFail($id);

        $data = $request->validate([
            'name' => 'required',
            'year' => 'nullable'
        ]);

        $batch->update($data);
        return $batch;
    }

    public function destroy($id)
    {
        return Batch::destroy($id);
    }
}
