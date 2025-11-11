import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Paper,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function PatientForm({ initial = {}, onSubmit, submitting }) {
  const [data, setData] = React.useState({
    name: initial?.name || "",
    age: initial?.age || "",
    gender: initial?.gender || "",
    phone: initial?.phone || "",
    address: initial?.address || "",
  });

  const change = (e) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <Paper elevation={0} sx={{ p: 1 }}>
      <Box component="form" onSubmit={submit}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField label="Patient Name" name="name" value={data.name} onChange={change} fullWidth required />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField label="Age" name="age" type="number" value={data.age} onChange={change} fullWidth required />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField select label="Gender" name="gender" value={data.gender} onChange={change} fullWidth required>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField label="Phone" name="phone" value={data.phone} onChange={change} fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Address" name="address" value={data.address} onChange={change} fullWidth multiline rows={3} />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth disabled={submitting} startIcon={<SaveIcon />}>
              {submitting ? "Saving..." : "Save Patient"}
            </Button>
          </Grid>

        </Grid>
      </Box>
    </Paper>
  );
}
