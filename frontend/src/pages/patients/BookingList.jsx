import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  EventAvailable as EventAvailableIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import api from "../../api/axios";
import Booking from "./Booking"; // ✅ Modal form

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [openForm, setOpenForm] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings");
      setBookings(res.data.data || []);
    } catch (err) {
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const cancelBooking = async () => {
    try {
      await api.delete(`/bookings/${deleteDialog.id}`);
      loadData();
      setDeleteDialog({ open: false, id: null });
    } catch {
      setError("Failed to cancel booking.");
    }
  };

  const filteredBookings = filterDate
    ? bookings.filter((b) => b.check_in === filterDate || b.check_out === filterDate)
    : bookings;

  const formatDate = (date) => new Date(date).toLocaleDateString("en-US");

  const getStatus = (inDate, outDate) => {
    const t = new Date();
    const i = new Date(inDate);
    const o = new Date(outDate);
    if (t < i) return { label: "Upcoming", color: "info" };
    if (t >= i && t <= o) return { label: "Active", color: "success" };
    return { label: "Completed", color: "default" };
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4">Booking List</Typography>
          <Typography variant="body2" color="text.secondary">Manage room reservations</Typography>
        </Box>
        <Button variant="contained" onClick={() => setOpenForm(true)}>+ Add Booking</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <FilterListIcon />
          <TextField
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            size="small"
          />
          {filterDate && (
            <Button onClick={() => setFilterDate("")} size="small">Clear</Button>
          )}
          <Box flexGrow={1} />
          <Chip label={`${filteredBookings.length} Bookings`} color="primary" />
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.light" }}>
              <TableCell>#</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Check-In</TableCell>
              <TableCell>Check-Out</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredBookings.length ? filteredBookings.map((b, i) => {
              const s = getStatus(b.check_in, b.check_out);
              return (
                <TableRow key={b.id} hover>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>Room {b.room?.room_number}</TableCell>
                  <TableCell>{b.customer_name}</TableCell>
                  <TableCell>{formatDate(b.check_in)}</TableCell>
                  <TableCell>{formatDate(b.check_out)}</TableCell>
                  <TableCell><Chip label={s.label} color={s.color} size="small" /></TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => setDeleteDialog({ open: true, id: b.id })}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            }) : (
              <TableRow><TableCell colSpan={7} align="center">No bookings found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialog.open}>
        <DialogTitle>Cancel Booking?</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null })}>No</Button>
          <Button color="error" variant="contained" onClick={cancelBooking}>Yes, Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <Booking onSuccess={() => { loadData(); setOpenForm(false); }} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
