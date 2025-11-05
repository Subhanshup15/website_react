<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class RoleController extends Controller
{
    public function assign(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'role' => 'required'
        ]);

        $user = User::find($request->user_id);
        $user->assignRole($request->role);

        return response()->json(['message' => 'Role assigned']);
    }
}
