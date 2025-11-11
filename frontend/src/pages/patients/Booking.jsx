import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Booking() {
  const [rooms, setRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    room_id: "",
    customer_name: "",
    check_in: "",
    check_out: ""
  });

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Load available rooms and patients
  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get("/rooms/available"),
      api.get("/patients")
    ])
      .then(([roomsRes, patientsRes]) => {
        setRooms(roomsRes.data.rooms || roomsRes.data.data || []);
        setPatients(patientsRes.data.data || []);
        setError("");
      })
      .catch((err) => {
        setError("Failed to load data. Please refresh the page.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    
    // If check_in changes and check_out is before it, clear check_out
    if (name === "check_in" && data.check_out && value > data.check_out) {
      setData({ ...data, [name]: value, check_out: "" });
    } else {
      setData({ ...data, [name]: value });
    }
    
    setError("");
  };

  const book = async (e) => {
    e.preventDefault();
    
    // Validate dates
    if (data.check_in >= data.check_out) {
      setError("Check-out date must be after check-in date");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await api.post("/rooms/book", data);
      alert(res.data.message || "Room Booked Successfully!");

      // Reset form
      setData({ room_id: "", customer_name: "", check_in: "", check_out: "" });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Could not book room. Please try again.";
      setError(errorMsg);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 col-md-6">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading booking form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 col-md-6">
      <h3 className="mb-3">Book Room</h3>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError("")}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div onSubmit={book}>
        {/* Select Room */}
        <div className="mb-3">
          <label className="form-label">Room</label>
          <select
            name="room_id"
            className="form-select"
            value={data.room_id}
            onChange={change}
            required
            disabled={submitting}
          >
            <option value="">Select Room</option>
            {rooms.length === 0 ? (
              <option disabled>No rooms available</option>
            ) : (
              rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  Room {room.room_number} - {room.type || "Standard"}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Select Patient */}
        <div className="mb-3">
          <label className="form-label">Patient</label>
          <select
            name="customer_name"
            className="form-select"
            value={data.customer_name}
            onChange={change}
            required
            disabled={submitting}
          >
            <option value="">Select Patient</option>
            {patients.length === 0 ? (
              <option disabled>No patients found</option>
            ) : (
              patients.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Check-in Date */}
        <div className="mb-3">
          <label className="form-label">Check-in Date</label>
          <input
            type="date"
            name="check_in"
            className="form-control"
            value={data.check_in}
            onChange={change}
            min={today}
            required
            disabled={submitting}
          />
        </div>

        {/* Check-out Date */}
        <div className="mb-3">
          <label className="form-label">Check-out Date</label>
          <input
            type="date"
            name="check_out"
            className="form-control"
            value={data.check_out}
            onChange={change}
            min={data.check_in || today}
            required
            disabled={submitting}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-success w-100"
          onClick={book}
          disabled={submitting || rooms.length === 0 || patients.length === 0}
        >
          {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Booking...
            </>
          ) : (
            "Book Room"
          )}
        </button>
      </div>
    </div>
  );
}