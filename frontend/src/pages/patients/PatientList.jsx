import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import PatientForm from "./PatientForm";
import api from "../../api/axios";

export default function PatientList() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [confirm, setConfirm] = React.useState({ open: false, id: null, name: "" });
  const [modal, setModal] = React.useState({ open: false, mode: "create", patient: null });

  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");
  const [search, setSearch] = React.useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/patients");
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setRows(
        data.map((p) => ({
          id: p.id,
          name: p.name,
          age: p.age,
          gender: p.gender,
          phone: p.phone,
          address: p.address,
        }))
      );
      setError("");
    } catch {
      setError("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const savePatient = async (payload) => {
    try {
      if (modal.mode === "create") {
        await api.post("/patients", payload);
        setSuccess("Patient added successfully");
      } else {
        await api.put(`/patients/${modal.patient.id}`, payload);
        setSuccess("Patient updated successfully");
      }

      setModal({ open: false, mode: "create", patient: null });
      load();
    } catch {
      setError("Failed to save patient. Check form data.");
    }
  };

  const del = async () => {
    try {
      const res = await api.delete(`/patients/${confirm.id}`);
      if (res.data?.status === false) setError(res.data.message);
      else setSuccess("Patient deleted successfully");
      setConfirm({ open: false, id: null, name: "" });
      load();
    } catch {
      setError("Failed to delete patient");
    }
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase()) ||
    row.phone?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "age", headerName: "Age", width: 90 },
    { field: "gender", headerName: "Gender", width: 110 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", flex: 1, minWidth: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-1">
          <IconButton
            size="small"
            onClick={() => setModal({ open: true, mode: "edit", patient: params.row })}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="error"
            onClick={() => setConfirm({ open: true, id: params.row.id, name: params.row.name })}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Paper className="p-5">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h5" fontWeight="bold">Patients</Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => setModal({ open: true, mode: "create", patient: null })}
        >
          Add Patient
        </Button>
      </div>

      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

      <TextField
        label="Search by Name / Phone"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <div style={{ height: 520, width: "100%" }}>
        <DataGrid rows={filteredRows} columns={columns} loading={loading} pageSizeOptions={[10, 25, 50]} />
      </div>

      {/* DELETE CONFIRM DIALOG */}
      <Dialog open={confirm.open} onClose={() => setConfirm({ open: false, id: null, name: "" })}>
        <DialogTitle>Delete Patient</DialogTitle>
        <DialogContent>Are you sure you want to delete <strong>{confirm.name}</strong>?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm({ open: false, id: null, name: "" })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={del}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* ADD / EDIT FORM MODAL */}
      <Dialog open={modal.open} onClose={() => setModal({ open: false, mode: "create", patient: null })} maxWidth="sm" fullWidth>
        <DialogTitle>{modal.mode === "create" ? "Add Patient" : "Edit Patient"}</DialogTitle>
        <DialogContent>
          <PatientForm initial={modal.patient} onSubmit={savePatient} />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
