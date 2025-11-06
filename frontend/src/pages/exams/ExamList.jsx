import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function ExamList() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    api.get("/exams").then(res => setExams(res.data));
  }, []);

  const deleteExam = async (id) => {
    if (!window.confirm("Delete this exam?")) return;
    await api.delete(`/exams/${id}`);
    setExams(exams.filter(e => e.id !== id));
  };

  return (
    <div className="container py-4">
      <h3 className="mb-3 fw-semibold">Exams</h3>

      <Link className="btn btn-primary mb-3" to="/exams/create">
        Add Exam
      </Link>

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
                  <Link to={`/exams/${e.id}/marks`} className="btn btn-sm btn-success me-2">
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
    </div>
  );
}
