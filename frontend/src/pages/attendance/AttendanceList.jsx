import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AttendanceList() {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [records, setRecords] = useState([]);

  const [batch_id, setBatch] = useState("");
  const [course_id, setCourse] = useState("");
  const [date, setDate] = useState("");

  // Load Batches & Courses
  useEffect(() => {
    api.get("/batches").then((r) => setBatches(r.data));
    api.get("/courses").then((r) => setCourses(r.data));
  }, []);

  // Load Attendance Records
  const load = () => {
    const params = {};
    if (batch_id) params.batch_id = batch_id;
    if (course_id) params.course_id = course_id;
    if (date) params.date = date;

    api.get("/attendance/list", { params }).then((r) => setRecords(r.data));
  };

  // Load automatically when any filter changes
  useEffect(() => {
    load();
  }, [batch_id, course_id, date]);

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold text-primary">Attendance Records</h3>

      {/* FILTER SECTION */}
      <div className="row g-3 mb-4">
        <div className="col-sm-4 col-md-3">
          <select className="form-select" value={batch_id} onChange={(e) => setBatch(e.target.value)}>
            <option value="">All Batches</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-4 col-md-3">
          <select className="form-select" value={course_id} onChange={(e) => setCourse(e.target.value)}>
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-4 col-md-3">
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="col-sm-12 col-md-3">
          <button className="btn btn-primary w-100" onClick={load}>
            Search
          </button>
        </div>
      </div>

      {/* ATTENDANCE LIST TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle text-center shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Batch</th>
              <th>Course</th>
              <th>Student</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((r) => (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td>{r.batch?.name || "-"}</td>
                  <td>{r.course?.name || "-"}</td>
                  <td>{r.student?.name || "-"}</td>
                  <td className={r.status === "present" ? "text-success fw-bold" : "text-danger fw-bold"}>
                    {r.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted py-3">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
