import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EnterMarks() {
  const { exam_id } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [exam, setExam] = useState(null);

  useEffect(() => {
    api.get(`/marks/${exam_id}`).then((res) => {
      // ✅ If API returns array only (no exam object)
      if (Array.isArray(res.data)) {
        // exam info does not exist → set max default 100
        setExam({ exam_name: "Exam", max_marks: 100 });
        setStudents(
          res.data.map((s) => ({
            student_id: s.student_id,
            student_name: s.student.name,
            marks_obtained: s.marks_obtained ?? ""
          }))
        );
      } 
      // ✅ If API returns exam + students object
      else {
        setExam(res.data.exam);
        setStudents(
          res.data.students.map((s) => ({
            student_id: s.student_id,
            student_name: s.student.name,
            marks_obtained: s.marks_obtained ?? ""
          }))
        );
      }
    });
  }, [exam_id]);

  const update = (id, val) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.student_id === id ? { ...s, marks_obtained: val } : s
      )
    );
  };

  const save = async () => {
    await api.post("/marks", { exam_id, marks: students });
    alert("Marks Saved ✅");
    navigate("/exams");
  };

  if (!exam) return <h4 className="text-center mt-4">Loading...</h4>;

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <h3>Enter Marks - {exam.exam_name}</h3>

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Student</th>
            <th>Marks (Max: {exam.max_marks})</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.student_id}>
              <td>{s.student_name}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={s.marks_obtained}
                  min="0"
                  max={exam.max_marks}
                  onChange={(e) => update(s.student_id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary w-100" onClick={save}>
        Save Marks
      </button>
    </div>
  );
}
