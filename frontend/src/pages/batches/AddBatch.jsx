import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddBatch() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", year: "" });

  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/batches", data);
    navigate("/batches", { replace: true });
  };

  return (
    <div className="container py-4 d-flex justify-content-center">
      <div className="card shadow-sm p-4" style={{ width: "450px" }}>
        <h3 className="mb-3 text-center fw-semibold">Add New Batch</h3>

        <form onSubmit={submit}>

          <div className="mb-3">
            <label className="form-label fw-medium">Batch Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Ex: BCA 2024"
              value={data.name}
              onChange={change}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Batch Year</label>
            <input
              type="number"
              name="year"
              className="form-control"
              placeholder="Ex: 2024"
              value={data.year}
              onChange={change}
            />
          </div>

          <button className="btn btn-primary w-100">
            <i className="bi bi-check-circle me-1"></i>
            Save Batch
          </button>

        </form>
      </div>
    </div>
  );
}
