import { Link } from "react-router-dom";
import useCachedFetch from "../../hooks/useCachedFetch";

export default function StudentList() {
  const { data: students, loading, refresh } =
    useCachedFetch("/students", "students_cache");

  return (
    <div className="page-content">


      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-semibold text-primary">Students</h3>
        <Link to="/students/create" className="btn btn-primary"> Add Student</Link>
      </div>


      {loading && <p>Loading...</p>}
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover text-center shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>DOB</th><th>Guardian</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.dob}</td>
                <td>{s.guardian_name}</td>
                <td className="text-center">
                  <Link
                    to={`/students/${s.id}/edit`}
                    className="btn btn-sm btn-outline-warning rounded-circle d-flex align-items-center justify-content-center"
                    title="Edit Student"
                    style={{ width: "34px", height: "34px" }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
