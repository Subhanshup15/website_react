import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Paper,
  Typography
} from "@mui/material";
import api from "../../api/axios";

export default function BillingForm({ initial = {}, onSubmit, submitting }) {
  const [patients, setPatients] = React.useState([]);
  const [data, setData] = React.useState({
    patient_id: initial?.patient_id || "",
    amount: initial?.amount || "",
    discount: initial?.discount || "",
  });

  React.useEffect(() => {
    api.get("/patients").then(res => {
      setPatients(res.data.data || []);
    });
  }, []);

  const change = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {initial?.id ? "Edit Bill" : "New Bill"}
      </Typography>

      <Box component="form" onSubmit={submit}>
        <FormControl fullWidth sx={{ mb: 2 }} required>
          <InputLabel>Select Patient</InputLabel>
          <Select
            name="patient_id"
            label="Select Patient"
            value={data.patient_id}
            onChange={change}
          >
            {patients.map((p) => (
              <MenuItem value={p.id} key={p.id}>{p.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Amount" name="amount" value={data.amount} onChange={change} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Discount" name="discount" value={data.discount} onChange={change} />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={submitting}
          startIcon={submitting && <CircularProgress size={20} color="inherit" />}
        >
          {submitting ? "Saving..." : "Save Bill"}
        </Button>
      </Box>
    </Paper>
  );
}
