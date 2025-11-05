import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function BatchList() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    api.get("/batches").then((res) => setBatches(res.data));
  }, []);

  const deleteBatch = async (id) => {
    if (!window.confirm("Delete this batch?")) return;
    await api.delete(`/batches/${id}`);
    setBatches(batches.filter(b => b.id !== id));
  };

  return (
    <div className="container p-4">
      <h3>Batches</h3>

      <Link to="/batches/create" className="btn btn-primary mb-3">
        Add Batch
      </Link>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>{b.year}</td>
              <td>
                <Link to={`/batches/${b.id}/edit`} className="btn btn-sm btn-warning me-2">
                  Edit
                </Link>

                <Link to={`/batches/${b.id}/assign-courses`} className="btn btn-sm btn-secondary me-2">
                  Assign Courses
                </Link>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteBatch(b.id)}
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
