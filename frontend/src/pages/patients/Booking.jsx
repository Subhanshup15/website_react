import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  MenuItem,
  Typography,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import {
  HotelOutlined as HotelIcon,
  PersonOutline as PersonIcon,
  EventAvailable as EventIcon,
  CheckCircleOutline as CheckIcon,
} from "@mui/icons-material";
import api from "../../api/axios";

export default function Booking() {
  const [rooms, setRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");
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
    setSuccess("");

    try {
      const res = await api.post("/rooms/book", data);
      const successMsg = res.data.message || "Room Booked Successfully!";
      setSuccess(successMsg);

      // Reset form
      setData({ room_id: "", customer_name: "", check_in: "", check_out: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(""), 5000);
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
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
          <CircularProgress size={60} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading booking form...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Book Room
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reserve a room for patient care
          </Typography>
        </Box>

        {/* Success Alert */}
        {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 3 }} 
            onClose={() => setSuccess("")}
            icon={<CheckIcon />}
          >
            {success}
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }} 
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={book} noValidate>
          {/* Select Room */}
          <FormControl fullWidth sx={{ mb: 3 }} required>
            <InputLabel id="room-select-label">Room</InputLabel>
            <Select
              labelId="room-select-label"
              id="room-select"
              name="room_id"
              value={data.room_id}
              onChange={change}
              label="Room"
              disabled={submitting || rooms.length === 0}
              startAdornment={
                <HotelIcon sx={{ mr: 1, color: "action.active" }} />
              }
            >
              {rooms.length === 0 ? (
                <MenuItem disabled value="">
                  No rooms available
                </MenuItem>
              ) : (
                rooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    Room {room.room_number} - {room.type || "Standard"}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Select Patient */}
          <FormControl fullWidth sx={{ mb: 3 }} required>
            <InputLabel id="patient-select-label">Patient</InputLabel>
            <Select
              labelId="patient-select-label"
              id="patient-select"
              name="customer_name"
              value={data.customer_name}
              onChange={change}
              label="Patient"
              disabled={submitting || patients.length === 0}
              startAdornment={
                <PersonIcon sx={{ mr: 1, color: "action.active" }} />
              }
            >
              {patients.length === 0 ? (
                <MenuItem disabled value="">
                  No patients found
                </MenuItem>
              ) : (
                patients.map((p) => (
                  <MenuItem key={p.id} value={p.name}>
                    {p.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Date Fields */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Check-in Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Check-in Date"
                name="check_in"
                value={data.check_in}
                onChange={change}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: today,
                }}
                disabled={submitting}
              />
            </Grid>

            {/* Check-out Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Check-out Date"
                name="check_out"
                value={data.check_out}
                onChange={change}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: data.check_in || today,
                }}
                disabled={submitting}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            fullWidth
            disabled={submitting || rooms.length === 0 || patients.length === 0}
            startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <EventIcon />}
            sx={{ py: 1.5 }}
          >
            {submitting ? "Booking..." : "Book Room"}
          </Button>

          {/* Info message when no data available */}
          {(rooms.length === 0 || patients.length === 0) && !loading && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {rooms.length === 0 && "No rooms available. "}
              {patients.length === 0 && "No patients found. "}
              Please add {rooms.length === 0 ? "rooms" : ""}{rooms.length === 0 && patients.length === 0 ? " and " : ""}{patients.length === 0 ? "patients" : ""} first.
            </Alert>
          )}
        </Box>
      </Paper>

      {/* Booking Summary (if form is filled) */}
      {(data.room_id || data.customer_name || data.check_in || data.check_out) && (
        <Paper elevation={1} sx={{ p: 3, mt: 3, backgroundColor: "grey.50" }}>
          <Typography variant="h6" gutterBottom>
            Booking Summary
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {data.room_id && (
              <Typography variant="body2">
                <strong>Room:</strong> {rooms.find(r => r.id === data.room_id)?.room_number || "N/A"}
              </Typography>
            )}
            {data.customer_name && (
              <Typography variant="body2">
                <strong>Patient:</strong> {data.customer_name}
              </Typography>
            )}
            {data.check_in && (
              <Typography variant="body2">
                <strong>Check-in:</strong> {new Date(data.check_in).toLocaleDateString("en-US", { 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}
              </Typography>
            )}
            {data.check_out && (
              <Typography variant="body2">
                <strong>Check-out:</strong> {new Date(data.check_out).toLocaleDateString("en-US", { 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}
              </Typography>
            )}
            {data.check_in && data.check_out && (
              <Typography variant="body2" color="primary">
                <strong>Duration:</strong> {Math.ceil((new Date(data.check_out) - new Date(data.check_in)) / (1000 * 60 * 60 * 24))} days
              </Typography>
            )}
          </Box>
        </Paper>
      )}
    </Container>
  );
}