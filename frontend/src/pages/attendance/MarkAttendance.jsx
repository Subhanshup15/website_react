import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function MarkAttendance() {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [batch_id, setBatch] = useState("");
  const [course_id, setCourse] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    api.get("/batches").then(r => setBatches(r.data));
    api.get("/courses").then(r => setCourses(r.data));
  }, []);

  useEffect(() => {
    if(batch_id) api.get(`/students`).then(r => setStudents(r.data));
  }, [batch_id]);

  const toggleStatus = (id, value) => {
    setStudents(students.map(s => s.id === id ? {...s, status:value} : s));
  };

  const submit = async () => {
    await api.post("/attendance", {
      batch_id, course_id, date,
      attendance: students.map(s => ({
        student_id: s.id,
        status: s.status || "absent"
      }))
    });
    alert("Attendance Saved ✅");
  };

  return (
    <div className="container p-4">

      <h3>Mark Attendance</h3>

      <select className="form-control mb-2" onChange={e=>setBatch(e.target.value)}>
        <option value="">Select Batch</option>
        {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
      </select>

      <select className="form-control mb-2" onChange={e=>setCourse(e.target.value)}>
        <option value="">Select Course</option>
        {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <input type="date" className="form-control mb-3" value={date} onChange={e=>setDate(e.target.value)} />

      <table className="table table-bordered">
        <thead><tr><th>Student</th><th>Status</th></tr></thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>
                <button className={`btn me-2 ${s.status === "present" ? "btn-success" : "btn-outline-success"}`}
                  onClick={()=>toggleStatus(s.id,"present")}>Present</button>
                <button className={`btn ${s.status === "absent" ? "btn-danger" : "btn-outline-danger"}`}
                  onClick={()=>toggleStatus(s.id,"absent")}>Absent</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={submit} className="btn btn-primary w-100">Save Attendance</button>
    </div>
  );
}
