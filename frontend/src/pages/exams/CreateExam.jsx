import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateExam(){
  const navigate = useNavigate();
  const [batches,setBatches]=useState([]);
  const [courses,setCourses]=useState([]);
  const [data,setData]=useState({ batch_id:"", course_id:"", exam_name:"", max_marks:100, date:"" });

  useEffect(()=>{ api.get("/batches").then(r=>setBatches(r.data)); api.get("/courses").then(r=>setCourses(r.data)); },[]);

  const submit = async (e)=>{ e.preventDefault(); await api.post("/exams",data); navigate("/exams"); };

  return (
    <div className="container p-4" style={{maxWidth:"500px"}}>
      <h3>Create Exam</h3>
      <form onSubmit={submit}>
        <select className="form-control mb-2" name="batch_id" onChange={e=>setData({...data,batch_id:e.target.value})}>
          <option>Select Batch</option>
          {batches.map(b=><option value={b.id}>{b.name}</option>)}
        </select>

        <select className="form-control mb-2" name="course_id" onChange={e=>setData({...data,course_id:e.target.value})}>
          <option>Select Course</option>
          {courses.map(c=><option value={c.id}>{c.name}</option>)}
        </select>

        <input className="form-control mb-2" placeholder="Exam Name" onChange={e=>setData({...data,exam_name:e.target.value})}/>
        <input className="form-control mb-2" placeholder="Max Marks" value={data.max_marks} onChange={e=>setData({...data,max_marks:e.target.value})}/>
        <input className="form-control mb-2" type="date" onChange={e=>setData({...data,date:e.target.value})}/>

        <button className="btn btn-success w-100">Save</button>
      </form>
    </div>
  );
}
