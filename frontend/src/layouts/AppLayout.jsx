import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useEffect } from "react";

export default function AppLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.roles?.[0]?.name?.toLowerCase() ?? "user";

  // Prevent browser back after login
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handleBackBlock = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handleBackBlock);
    return () => window.removeEventListener("popstate", handleBackBlock);
  }, []);

  const logout = async () => {
    try { await api.post("/logout"); } catch (e) { }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* ✅ NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-info  px-3">
        <div className="container-fluid">

          <Link className="navbar-brand fw-semibold" to={`/${role}`}>
            School ERP
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link" to={`/${role}`}>Dashboard</Link>
              </li>

              {(role === "admin") && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/students">Students</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/teachers">Teachers</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/courses">Courses</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/batches">Batches</Link></li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      Attendance
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/attendance/mark">Mark Attendance</Link></li>
                      <li><Link className="dropdown-item" to="/attendance/list">Attendance List</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      Exams
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/exams/create"> Add Exams </Link></li>
                      <li><Link className="dropdown-item" to="/exams">Exams List</Link></li>
                    </ul>
                  </li>


                </>
              )}
              {(role === "teacher") && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/students">Students</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/courses">Courses</Link></li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      Attendance
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/attendance/mark">Mark Attendance</Link></li>
                      <li><Link className="dropdown-item" to="/attendance/list">Attendance List</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      Exams
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/exams/create"> Add Exams </Link></li>
                      <li><Link className="dropdown-item" to="/exams">Exams List</Link></li>
                    </ul>
                  </li>
                </>
              )}

            </ul>

            <div className="d-flex align-items-center text-white">
              <span className="me-3 small">Role: <b className="text-uppercase">{role}</b></span>
              <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
            </div>
          </div>

        </div>
      </nav>

      {/* ✅ PAGE CONTENT */}
      <main className="container py-4 flex-grow-1">
        <Outlet />
      </main>

      {/* ✅ FOOTER */}
      <footer className="bg-dark text-white text-center py-2 mt-auto">
        <small>© {new Date().getFullYear()} School ERP • All Rights Reserved.</small>
      </footer>

    </div>
  );
}
