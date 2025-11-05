import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container py-4">

      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row g-3">

        <div className="col-md-4">
          <Link to="/students" className="text-decoration-none text-white">
            <div className="card shadow-sm p-3">
              <h4>Students</h4>
              <p className="mb-0 text-muted">Manage all students</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/teachers" className="text-decoration-none text-dark">
            <div className="card shadow-sm p-3">
              <h4>Teachers</h4>
              <p className="mb-0 text-muted">Manage teacher records</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/courses" className="text-decoration-none text-dark">
            <div className="card shadow-sm p-3">
              <h4>Courses</h4>
              <p className="mb-0 text-muted">View & manage courses</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/batches" className="text-decoration-none text-dark">
            <div className="card shadow-sm p-3">
              <h4>Batches</h4>
              <p className="mb-0 text-muted">Manage class batches</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/attendance/mark" className="text-decoration-none text-dark">
            <div className="card shadow-sm p-3">
              <h4>Attendance</h4>
              <p className="mb-0 text-muted">Mark and view attendance</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/exams/create" className="text-decoration-none text-dark">
            <div className="card shadow-sm p-3">
              <h4>Exams</h4>
              <p className="mb-0 text-muted">Create exams & enter marks</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
