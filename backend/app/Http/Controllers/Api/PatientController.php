<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        return response()->json(['status' => true, 'data' => Patient::all()]);
    }

    public function store(Request $request)
    {
        $patient = Patient::create($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Patient Created Successfully',
            'data' => $patient
        ]);
    }

    public function show($id)
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json([
                'status' => false,
                'message' => 'Patient not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $patient
        ]);
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|numeric',
            'gender' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $patient = Patient::findOrFail($id);
        $patient->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Patient updated successfully',
            'data' => $patient
        ]);
    }

    public function destroy($id)
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json([
                'status' => false,
                'message' => 'Patient not found'
            ], 404);
        }

        // ✅ This will automatically delete Billing + Booking records
        $patient->delete();

        return response()->json([
            'status' => true,
            'message' => 'Patient and related records deleted successfully'
        ]);
    }
}
