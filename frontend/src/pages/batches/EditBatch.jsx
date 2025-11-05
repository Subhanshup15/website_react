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

  if (loading) return <h4 className="text-center mt-4">Loading...</h4>;

  return (
    <div className="container p-4" style={{ maxWidth: "500px" }}>
      <h3>Edit Batch</h3>

      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Batch Name"
          value={data.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="year"
          placeholder="Batch Year"
          value={data.year}
          onChange={handleChange}
        />

        <button className="btn btn-warning w-100">Update</button>
      </form>
    </div>
  );
}
