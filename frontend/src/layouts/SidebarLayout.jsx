import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./sidebar.css";

export default function SidebarLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.roles?.[0]?.name?.toLowerCase() ?? "user";

  const [open, setOpen] = useState(true);

  const logout = async () => {
    try { await api.post("/logout"); } catch {}
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : "closed"}`}>
        <div className="sidebar-title">School ERP</div>

        <nav>
          <Link to={`/${role}`}>Dashboard</Link>
          <Link to="/students">Students</Link>
          <Link to="/teachers">Teachers</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/batches">Batches</Link>
          <Link to="/attendance/mark">Attendance</Link>
          <Link to="/attendance/list">Attendance List</Link>
          <Link to="/exams">Exams</Link>
        </nav>

        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className={`main ${open ? "shifted" : ""}`}>
        <div className="topbar">
          <button className="sidebar-toggle" onClick={() => setOpen(!open)}>☰</button>
          <span className="role-text">Role: <b className="text-uppercase">{role}</b></span>
        </div>

        <div className="page-content">
          <Outlet />
        </div>

        <footer className="footer">
          © {new Date().getFullYear()} School ERP • All Rights Reserved.
        </footer>
      </main>

    </div>
  );
}
