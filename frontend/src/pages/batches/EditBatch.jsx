import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBatch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    name: "",
    year: "",
  });

  useEffect(() => {
    api.get(`/batches/${id}`).then((res) => {
      setData({
        name: res.data.name,
        year: res.data.year ?? "",
      });
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/batches/${id}`, data);
    navigate("/batches", { replace: true });
  };

  if (loading) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container py-4 d-flex justify-content-center">
      <div className="card shadow-sm p-4" style={{ width: "450px" }}>
        <h3 className="mb-3 text-center fw-semibold">Edit Batch</h3>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label fw-medium">Batch Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Ex: BCA 2024"
              value={data.name}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-warning w-100">
            <i className="bi bi-pencil-square me-1"></i>
            Update Batch
          </button>
        </form>
      </div>
    </div>
  );
}
