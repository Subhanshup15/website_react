import { Link } from "react-router-dom";
import api from "../../api/axios";
import useCachedFetch from "../../hooks/useCachedFetch";

export default function BatchList() {
  const { data: batches = [], setData } = useCachedFetch("/batches", "batches_cache");

  const deleteBatch = async (id) => {
    if (!window.confirm("Delete this batch?")) return;

    await api.delete(`/batches/${id}`);

    const updated = batches.filter(b => b.id !== id);
    setData(updated);
    localStorage.setItem("batches_cache", JSON.stringify(updated));
  };

  return (
    <div className="page-content">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-semibold text-primary">Batches</h3>
        <Link to="/batches/create" className="btn btn-primary">+ Add Batch</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover text-center shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Batch Name</th>
              <th>Year</th>
              <th>Courses Assigned</th>
              <th style={{ width: "140px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {batches.length > 0 ? (
              batches.map(b => (
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
                    <div className="btn-group" role="group">

                      <Link
                        to={`/batches/${b.id}/assign-courses`}
                        className="btn btn-sm btn-outline-info"
                        title="Assign Courses"
                      >
                        <i className="bi bi-diagram-3"></i>
                      </Link>

                      <Link
                        to={`/batches/${b.id}/edit`}
                        className="btn btn-sm btn-outline-warning"
                        title="Edit Batch"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteBatch(b.id)}
                        title="Delete Batch"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted py-3">No batches found.</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
