import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MyMarks() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    api.get("/student/marks").then(res => setMarks(res.data));
  }, []);

  return (
    <div className="container p-4">
      <h3>My Exam Marks</h3>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr><th>Exam</th><th>Course</th><th>Date</th><th>Marks</th></tr>
        </thead>
        <tbody>
          {marks.map((m,i) => (
            <tr key={i}>
              <td>{m.exam_name}</td>
              <td>{m.course}</td>
              <td>{m.date}</td>
              <td><b>{m.marks_obtained}</b> / {m.max_marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
