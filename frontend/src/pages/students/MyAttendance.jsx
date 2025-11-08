import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MyAttendance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/student/attendance").then(res => setRecords(res.data));
  }, []);

  return (
    <div className="container p-4">
      <h3>My Attendance</h3>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr><th>Date</th><th>Course</th><th>Status</th></tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.course?.name}</td>
              <td className={r.status === "present" ? "text-success fw-bold" : "text-danger fw-bold"}>
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
