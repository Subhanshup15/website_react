import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    api.get("/teachers").then((res) => setTeachers(res.data));
  }, []);

  const del = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;
    await api.delete(`/teachers/${id}`);
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  return (
    <div className="Row">
      <h3>Teachers</h3>

      <Link to="/teachers/create" className="btn btn-primary mb-3">
        Add Teacher
      </Link>
      <div className="col-12">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Qualification</th>
              <th>Department</th>
              <th>courses</th>
              <th>Actions</th>
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
                  {t.courses && t.courses.length > 0
                    ? t.courses.map(c => c.name).join(", ")
                    : <span className="text-muted">No Courses Assigned</span>}
                </td>

                <td className="text-center">

                  <Link
                    to={`/teachers/${t.id}/assign-courses`}
                    className="btn btn-sm btn-outline-info me-2"
                    title="Assign Courses"
                  >
                    <i className="fas fa-book"></i>
                  </Link>

                  <Link
                    to={`/teachers/${t.id}/edit`}
                    className="btn btn-sm btn-outline-warning me-2"
                    title="Edit Teacher"
                  >
                    <i className="fas fa-edit"></i>
                  </Link>

                  <button
                    onClick={() => del(t.id)}
                    className="btn btn-sm btn-outline-danger"
                    title="Delete Teacher"
                  >
                    <i className="fas fa-trash"></i>
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
