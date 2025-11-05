import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then(res => setCourses(res.data));
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await api.delete(`/courses/${id}`);
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="container p-4">
      <h3>Courses</h3>
      <Link className="btn btn-primary mb-3" to="/courses/create">Add Course</Link>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Code</th><th>Name</th><th>Credit</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.credit}</td>
              <td>
                <Link className="btn btn-warning btn-sm me-2"
                 to={`/courses/${c.id}/edit`}><i className="fas fa-edit"></i></Link>
                <button className="btn btn-danger btn-sm" onClick={() => deleteCourse(c.id)}> <i className="fas fa-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
