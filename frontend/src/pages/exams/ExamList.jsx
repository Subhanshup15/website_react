import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadExams = async () => {
    // ✅ Check Local Cache
    const cached = localStorage.getItem("exams_cache");
    if (cached) {
      setExams(JSON.parse(cached));
      setLoading(false);
      return;
    }

    // ✅ Fetch if no cache
    const res = await api.get("/exams");
    setExams(res.data);

    // ✅ Store Cache
    localStorage.setItem("exams_cache", JSON.stringify(res.data));
    setLoading(false);
  };

  useEffect(() => {
    loadExams();
  }, []);

  const deleteExam = async (id) => {
    if (!window.confirm("Delete this exam?")) return;

    await api.delete(`/exams/${id}`);

    const updated = exams.filter(e => e.id !== id);
    setExams(updated);

    // ✅ Update Cache After Delete
    localStorage.setItem("exams_cache", JSON.stringify(updated));
  };

  // ✅ When clicking Add Exam, clear cache so new data loads fresh
  const clearCache = () => localStorage.removeItem("exams_cache");

  return (
    <div className="container py-4">
      <h3 className="mb-3 fw-semibold">Exams</h3>

      <Link className="btn btn-primary mb-3" to="/exams/create" onClick={clearCache}>
        Add Exam
      </Link>

      {loading ? (
        <h5 className="text-center text-muted py-3">Loading...</h5>
      ) : (
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Batch</th>
              <th>Course</th>
              <th>Exam Name</th>
              <th>Max Marks</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.length > 0 ? (
              exams.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.batch?.name}</td>
                  <td>{e.course?.name}</td>
                  <td>{e.exam_name}</td>
                  <td>{e.max_marks}</td>
                  <td>{e.date}</td>
                  <td>
                    <Link
                      to={`/exams/${e.id}/marks`}
                      className="btn btn-sm btn-success me-2"
                      onClick={clearCache}
                    >
                      Enter Marks
                    </Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteExam(e.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-muted py-3">No exams found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
