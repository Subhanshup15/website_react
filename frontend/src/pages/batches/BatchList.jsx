import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function BatchList() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    api.get("/batches").then(res => setBatches(res.data));
  }, []);

  const deleteBatch = async (id) => {
    if (!window.confirm("Delete this batch?")) return;
    await api.delete(`/batches/${id}`);
    setBatches(batches.filter(b => b.id !== id));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-semibold">Batches</h3>
        <Link to="/batches/create" className="btn btn-primary">+ Add Batch</Link>
      </div>

      <table className="table table-modern table-hover shadow-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Batch Name</th>
            <th>Year</th>
            <th>Courses</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {batches.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td className="fw-medium">{b.name}</td>
              <td>{b.year}</td>

              <td>
                {b.courses?.length
                  ? b.courses.map(c => c.name).join(", ")
                  : <span className="text-muted">No Courses</span>}
              </td>

              <td className="text-center">
                <Link to={`/batches/${b.id}/assign-courses`} className="btn btn-sm btn-outline-primary me-2 btn-icon">
                  <i className="bi bi-diagram-3"></i>
                </Link>

                <Link to={`/batches/${b.id}/edit`} className="btn btn-sm btn-outline-warning me-2 btn-icon">
                  <i className="bi bi-pencil-square"></i>
                </Link>

                <button onClick={() => deleteBatch(b.id)} className="btn btn-sm btn-outline-danger btn-icon">
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
