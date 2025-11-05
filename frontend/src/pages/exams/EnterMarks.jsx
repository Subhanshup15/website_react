import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams } from "react-router-dom";

export default function EnterMarks(){
  const { exam_id } = useParams();
  const [students,setStudents]=useState([]);
  const [max,setMax]=useState(100);

  useEffect(()=>{
    api.get(`/marks/${exam_id}`).then(r=>{
      setStudents(r.data.map(s=>({...s, marks_obtained:s.marks_obtained || 0 })));
    });
  },[exam_id]);

  const update = (id,val)=>{
    setStudents(students.map(s=>s.student_id===id?{...s,marks_obtained:val}:s));
  };

  const submit = async ()=>{
    await api.post("/marks",{ exam_id, marks:students });
    alert("Marks Saved ✅");
  };

  return(
    <div className="container p-4">
      <h3>Enter Marks</h3>
      <table className="table table-bordered">
        <thead><tr><th>Student</th><th>Marks</th></tr></thead>
        <tbody>
          {students.map(s=>(
            <tr key={s.student_id}>
              <td>{s.student.name}</td>
              <td><input type="number" className="form-control" value={s.marks_obtained} onChange={e=>update(s.student_id,e.target.value)}/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary w-100" onClick={submit}>Save Marks</button>
    </div>
  );
}
