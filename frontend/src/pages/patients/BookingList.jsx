import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  const loadData = () => {
    api.get("/bookings").then((res) => {
      setBookings(res.data.data || []);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    await api.delete(`/bookings/${id}`);
    loadData();
  };

  const filteredBookings = filterDate
    ? bookings.filter((b) => b.check_in === filterDate || b.check_out === filterDate)
    : bookings;

  return (
      <div className="container mt-4">
      <h3 className="text-2xl font-semibold mb-4">Booking List</h3>

      {/* ✅ Date Filter */}
      <input
        type="date"
        className="border p-2 rounded mb-4"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />

      <table className="min-w-full bg-white rounded shadow border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th  className="p-5">#</th>
            <th className="p-5">Room</th>
            <th className="p-5">Patient Name</th>
            <th className="p-5">Check-in</th>
            <th className="p-5">Check-out</th>
            <th className="p-5">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.map((b, i) => (
            <tr key={b.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{b.room?.room_number}</td>
              <td className="p-3">{b.customer_name}</td>
              <td className="p-3">{b.check_in}</td>
              <td className="p-3">{b.check_out}</td>
              <td className="p-3">
                <button
                  onClick={() => cancelBooking(b.id)}
                  className="bg-red-500 hover:bg-red-600 text-red px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}

          {filteredBookings.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-red-500">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
