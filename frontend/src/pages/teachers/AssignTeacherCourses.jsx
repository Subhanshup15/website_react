import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function AssignTeacherCourses() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState([]);

  // Load all courses + already assigned courses
  useEffect(() => {
    api.get("/courses").then(res => setCourses(res.data));
    api.get(`/teachers/${id}/courses`).then(res => {
      setSelected(res.data.map(c => c.id)); // already assigned
    });
  }, [id]);

  // Toggle selection
  const toggle = (courseId) => {
    setSelected(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId) // remove
        : [...prev, courseId] // add
    );
  };

  // ✅ SAVE ASSIGNMENT
  const save = async () => {
    await api.post(`/teachers/${id}/courses`, { course_ids: selected });
    alert("Courses Updated ✅");
    navigate("/teachers", { replace: true });
  };

  return (
    <div className="container p-4" style={{ maxWidth: "500px" }}>
      <h3>Assign Courses to Teacher</h3>

      {courses.map(c => (
        <div key={c.id} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={selected.includes(c.id)}
            onChange={() => toggle(c.id)}
          />
          <label className="form-check-label">{c.name}</label>
        </div>
      ))}

      <button onClick={save} className="btn btn-primary w-100 mt-3">
        Save
      </button>
    </div>
  );
}
