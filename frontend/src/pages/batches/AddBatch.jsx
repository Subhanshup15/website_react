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
    navigate("/batches");
  };

  return (
    <div className="container p-4" style={{ maxWidth: "500px" }}>
      <h3>Add Batch</h3>

      <form onSubmit={submit}>
        <input className="form-control mb-2" name="name" placeholder="Batch Name" value={data.name} onChange={change} required />
        <input className="form-control mb-2" name="year" placeholder="Batch Year" value={data.year} onChange={change} />
        <button className="btn btn-success w-100">Save</button>
      </form>
    </div>
  );
}
