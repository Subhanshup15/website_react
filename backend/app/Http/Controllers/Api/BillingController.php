<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Billing;

class BillingController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => true,
            'data' => Billing::with('patient')->orderBy('id', 'DESC')->get()
        ]);
    }

    public function show($id)
    {
        $bill = Billing::with('patient')->find($id);

        if (!$bill) {
            return response()->json([
                'status' => false,
                'message' => 'Bill not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $bill
        ]);
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'amount' => 'required|numeric',
            'discount' => 'nullable|numeric'
        ]);

        $data['discount'] = $data['discount'] ?? 0;
        $data['final_amount'] = $data['amount'] - $data['discount'];

        $bill = Billing::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Bill Created Successfully',
            'data' => $bill
        ]);
    }

    public function update(Request $request, $id)
    {
        $bill = Billing::findOrFail($id);

        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'amount' => 'required|numeric',
            'discount' => 'nullable|numeric'
        ]);

        $data['discount'] = $data['discount'] ?? 0;
        $data['final_amount'] = $data['amount'] - $data['discount'];

        $bill->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Bill Updated Successfully',
            'data' => $bill
        ]);
    }

    public function destroy($id)
    {
        $bill = Billing::find($id);

        if (!$bill) {
            return response()->json([
                'status' => false,
                'message' => 'Bill not found'
            ], 404);
        }

        $bill->delete();

        return response()->json([
            'status' => true,
            'message' => 'Bill Deleted Successfully'
        ]);
    }
}
