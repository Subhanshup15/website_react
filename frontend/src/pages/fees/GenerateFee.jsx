import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function GenerateFee(){
  const [students,setStudents]=useState([]);
  const [heads,setHeads]=useState([]);
  const [items,setItems]=useState([]);
  const [student_id,setStudent]=useState("");
  const [due_date,setDueDate]=useState("");

  useEffect(()=>{
    api.get("/students").then(r=>setStudents(r.data));
    api.get("/fee-heads").then(r=>setHeads(r.data));
  },[]);

  const toggleHead = (head)=>{
    if(items.find(i=>i.fee_head_id===head.id)) return;
    setItems([...items, {fee_head_id: head.id, amount: head.amount, name: head.name}]);
  };

  const submit = async ()=>{
    await api.post("/fee-invoice",{ student_id, due_date, items });
    alert("Invoice Created ✅");
  };

  return(
    <div className="container p-4">
      <h3>Generate Fee Invoice</h3>

      <select className="form-control mb-2" onChange={e=>setStudent(e.target.value)}>
        <option>Select Student</option>
        {students.map(s=><option value={s.id}>{s.name}</option>)}
      </select>

      <input className="form-control mb-2" type="date" onChange={e=>setDueDate(e.target.value)}/>

      <h5>Select Fee Heads:</h5>
      {heads.map(h=>(
        <button className="btn btn-outline-primary m-1" onClick={()=>toggleHead(h)}>{h.name}</button>
      ))}

      <table className="table mt-3 table-bordered">
        <thead><tr><th>Head</th><th>Amount</th></tr></thead>
        <tbody>
          {items.map(i=>(
            <tr><td>{i.name}</td><td>{i.amount}</td></tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-success w-100" onClick={submit}>Save Invoice</button>
    </div>
  );
}
