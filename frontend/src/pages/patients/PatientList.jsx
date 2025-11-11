import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/axios";

export default function PatientList() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [confirm, setConfirm] = React.useState({ open: false, id: null, name: "" });
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/patients");      // expects array of patients
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setRows(
        data.map((p) => ({
          id: p.id,
          name: p.name,
          age: p.age,
          gender: p.gender,
          phone: p.phone,
          address: p.address,
          created_at: p.created_at,
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { load(); }, []);

  const del = async () => {
    try {
      await api.delete(`/patients/${confirm.id}`);
      setConfirm({ open: false, id: null, name: "" });
      load();
    } catch (e) {
      alert("Failed to delete patient");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
    { field: "age", headerName: "Age", width: 80 },
    { field: "gender", headerName: "Gender", width: 110 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", flex: 1, minWidth: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-1">
          <IconButton size="small" onClick={() => navigate(`/patients/${params.row.id}/edit`)}>
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
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Patients</h2>
        <Button component={Link} to="/patients/create" variant="contained">Add Patient</Button>
      </div>
      <div className="bg-white rounded-xl shadow p-2">
        <div style={{ height: 520, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          />
        </div>
      </div>

      <Dialog open={confirm.open} onClose={() => setConfirm({ open: false, id: null, name: "" })}>
        <DialogTitle>Delete Patient</DialogTitle>
        <DialogContent>Are you sure you want to delete “{confirm.name}”?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm({ open: false, id: null, name: "" })}>Cancel</Button>
          <Button color="error" onClick={del} variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
