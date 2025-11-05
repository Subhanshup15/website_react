import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    const res = await api.get("/students");
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Students</h3>
        <Link to="/students/create" className="btn btn-primary">+ Add Student</Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Guardian</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (
            <tr><td colSpan="7" className="text-center text-muted">No students found</td></tr>
          )}

          {students.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.dob}</td>
              <td>{s.guardian_name}</td>
              <td>
                <Link to={`/students/${s.id}/edit`} className="btn btn-sm btn-warning me-2">Edit</Link>
                {/* Optional Delete Button later */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
