import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/student/courses").then(res => setCourses(res.data));
  }, []);

  return (
    <div className="container p-4">
      <h3>My Courses</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-dark"><tr><th>Course</th><th>Code</th><th>Credit</th></tr></thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.code}</td>
              <td>{c.credit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
