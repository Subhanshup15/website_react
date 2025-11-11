import * as React from "react";
import { Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import api from "../../api/axios";

export default function BillingList() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [confirm, setConfirm] = React.useState({ open: false, id: null });
  const [message, setMessage] = React.useState("");

  const load = async () => {
    const res = await api.get("/billing");
    const data = res.data.data || [];
    setRows(data.map(b => ({
      id: b.id,
      patient: b.patient?.name,
      amount: b.amount,
      discount: b.discount,
      final_amount: b.final_amount,
    })));
  };

  React.useEffect(() => { load(); }, []);

  const del = async () => {
    await api.delete(`/billing/${confirm.id}`);
    setConfirm({ open: false, id: null });
    setMessage("Bill deleted successfully");
    load();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "patient", headerName: "Patient", flex: 1 },
    { field: "amount", headerName: "Amount", width: 120 },
    { field: "discount", headerName: "Discount", width: 120 },
    { field: "final_amount", headerName: "Final Amount", width: 140 },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => navigate(`/billing/${params.row.id}/edit`)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setConfirm({ open: true, id: params.row.id })}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Paper sx={{ p: 4 }}>
      <div className="flex justify-between mb-3">
        <h2>Billing Records</h2>
        <Button component={Link} to="/billing/create" variant="contained">Add Bill</Button>
      </div>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

      <div style={{ height: 520 }}>
        <DataGrid rows={rows} columns={columns} />
      </div>

      <Dialog open={confirm.open}>
        <DialogTitle>Delete Bill?</DialogTitle>
        <DialogContent>Are you sure?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm({ open: false })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={del}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
