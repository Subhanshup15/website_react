import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const navigate = useNavigate();
  const [data, setData] = useState({ code: "", name: "", credit: "" });

  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/courses", data);
    navigate("/courses");
  };

  return (
    <div className="container p-4" style={{ maxWidth: "500px" }}>
      <h3>Add Course</h3>

      <form onSubmit={submit}>
        <input className="form-control mb-2" placeholder="Course Code" name="code" value={data.code} onChange={change} required />
        <input className="form-control mb-2" placeholder="Course Name" name="name" value={data.name} onChange={change} required />
        <input className="form-control mb-2" placeholder="Credit" name="credit" value={data.credit} onChange={change} />

        <button className="btn btn-success w-100">Save</button>
      </form>
    </div>
  );
}
