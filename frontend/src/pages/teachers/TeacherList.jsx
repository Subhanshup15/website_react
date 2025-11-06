import { Link } from "react-router-dom";
import api from "../../api/axios";
import useCachedFetch from "../../hooks/useCachedFetch";

export default function TeacherList() {
  const { data: teachers, setData } = useCachedFetch("/teachers", "teachers_cache");

  const del = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;
    await api.delete(`/teachers/${id}`);

    const updated = teachers.filter(t => t.id !== id);
    setData(updated);
    localStorage.setItem("teachers_cache", JSON.stringify(updated));
  };

  return (
    <div className="page-content">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-semibold text-primary">Teacher</h3>
        <Link to="/teachers/create" className="btn btn-primary"> Add Teacher</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Qualification</th>
              <th>Department</th>
              <th>Courses</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.phone}</td>
                <td>{t.qualification}</td>
                <td>{t.department}</td>

                <td>
                  {t.courses?.length
                    ? t.courses.map(c => c.name).join(", ")
                    : <span className="text-muted">No Courses</span>}
                </td>

                <td className="text-center">

                  <div className="btn-group" role="group">

                    <Link
                      to={`/teachers/${t.id}/assign-courses`}
                      className="btn btn-sm btn-outline-primary"
                      title="Assign Courses"
                    >
                      <i className="bi bi-diagram-3"></i>
                    </Link>

                    <Link
                      to={`/teachers/${t.id}/edit`}
                      className="btn btn-sm btn-outline-warning"
                      title="Edit Teacher"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>

                    <button
                      onClick={() => del(t.id)}
                      className="btn btn-sm btn-outline-danger"
                      title="Delete Teacher"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>

                  </div>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

  );
}
