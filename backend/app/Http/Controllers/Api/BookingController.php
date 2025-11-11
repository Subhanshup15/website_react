<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Room;
use App\Models\Booking;

class BookingController extends Controller
{
    public function availableRooms()
    {
        return response()->json([
            'rooms' => Room::where('status', 'available')->get()
        ]);
    }
    public function index()
    {
        return response()->json([
            'status' => true,
            'data' => Booking::with('room')->orderBy('id', 'desc')->get()
        ]);
    }



    public function store(Request $request)
    {
        Booking::create($request->all());
        Room::where('id', $request->room_id)->update(['status' => 'booked']);

        return response()->json(['status' => true, 'message' => 'Room Booked Successfully']);
    }

    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);

        // free the room
        Room::where('id', $booking->room_id)->update(['status' => 'available']);

        // delete booking
        $booking->delete();

        return response()->json([
            'status' => true,
            'message' => 'Booking Cancelled & Room Marked Available'
        ]);
    }
}
