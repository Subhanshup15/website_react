import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AssignCourses() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [batch, setBatch] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    api.get(`/batch/${id}/courses`).then(res => {
      setBatch(res.data);
      setSelected(res.data.courses.map(c => c.id));
    });
    api.get("/courses").then(res => setCourses(res.data));
  }, [id]);

  const toggleSelect = (course_id) => {
    setSelected(prev =>
      prev.includes(course_id)
        ? prev.filter(id => id !== course_id)
        : [...prev, course_id]
    );
  };

  const submit = async () => {
    await api.post(`/batch/${id}/courses`, { course_ids: selected });
    navigate("/batches");
  };

  if (!batch) return <h4 className="text-center mt-4">Loading...</h4>;

  return (
    <div className="container p-4">
      <h3>Assign Courses to Batch: {batch.name}</h3>

      <div className="list-group my-3">
        {courses.map(course => (
          <label key={course.id} className="list-group-item">
            <input
              type="checkbox"
              checked={selected.includes(course.id)}
              onChange={() => toggleSelect(course.id)}
            />{" "}
            {course.name} ({course.code})
          </label>
        ))}
      </div>

      <button className="btn btn-success w-100" onClick={submit}>
        Save Assignments
      </button>
    </div>
  );
}
