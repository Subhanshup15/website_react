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
  ReceiptLong as ReceiptIcon,
  PersonOutline as PersonIcon,
  Payment as PaymentIcon,
  CheckCircleOutline as CheckIcon,
} from "@mui/icons-material";
import api from "../../api/axios";

export default function Billing() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [data, setData] = useState({
    patient_id: "",
    amount: "",
    discount: "",
  });

  useEffect(() => {
    setLoading(true);
    api
      .get("/patients")
      .then((res) => {
        setPatients(res.data.data || res.data);
        setError("");
      })
      .catch(() => {
        setError("Failed to load patient list.");
      })
      .finally(() => setLoading(false));
  }, []);

  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/billing/create", data);
      setSuccess(res.data.message || "Bill Created Successfully!");
      setData({ patient_id: "", amount: "", discount: "" });

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError("Error generating bill. Try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const finalAmount = data.amount
    ? Number(data.amount) - (Number(data.discount) || 0)
    : "";

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" flexDirection="column">
          <CircularProgress size={60} />
          <Typography sx={{ mt: 2 }}>Loading Billing Form...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Generate Bill</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create a bill for patient treatment or services
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }} icon={<CheckIcon />} onClose={() => setSuccess("")}>
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={submit}>
          <FormControl fullWidth sx={{ mb: 3 }} required>
            <InputLabel>Select Patient</InputLabel>
            <Select
              name="patient_id"
              value={data.patient_id}
              label="Select Patient"
              onChange={change}
              startAdornment={<PersonIcon sx={{ mr: 1, color: "action.active" }} />}
            >
              {patients.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="amount"
                label="Amount"
                type="number"
                value={data.amount}
                onChange={change}
                required
                InputProps={{ startAdornment: <PaymentIcon sx={{ mr: 1, color: "action.active" }} /> }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="discount"
                label="Discount"
                type="number"
                value={data.discount}
                onChange={change}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <ReceiptIcon />}
          >
            {submitting ? "Generating..." : "Generate Bill"}
          </Button>
        </Box>
      </Paper>

      {(data.patient_id || data.amount) && (
        <Paper elevation={1} sx={{ p: 3, mt: 3, backgroundColor: "grey.50" }}>
          <Typography variant="h6" gutterBottom>Bill Summary</Typography>
          <Typography><strong>Patient:</strong> {patients.find((p) => p.id == data.patient_id)?.name || "N/A"}</Typography>
          <Typography><strong>Amount:</strong> ₹{data.amount || 0}</Typography>
          <Typography><strong>Discount:</strong> ₹{data.discount || 0}</Typography>

          {data.amount && (
            <Typography color="primary" fontWeight="bold" sx={{ mt: 1 }}>
              Final Bill: ₹{finalAmount}
            </Typography>
          )}
        </Paper>
      )}
    </Container>
  );
}
