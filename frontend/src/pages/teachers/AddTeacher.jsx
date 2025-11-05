import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddTeacher() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    department: "",
  });

  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/teachers", data);
    navigate("/teachers");
  };

  return (
    <div className="container p-4" style={{ maxWidth: "500px" }}>
      <h3>Add Teacher</h3>

      <form onSubmit={submit}>
        <input className="form-control mb-2" name="name" placeholder="Name" value={data.name} onChange={change} required />
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" value={data.email} onChange={change} required />
        <input className="form-control mb-2" name="phone" placeholder="Phone" value={data.phone} onChange={change} />
        <input className="form-control mb-2" name="qualification" placeholder="Qualification" value={data.qualification} onChange={change} />
        <input className="form-control mb-2" name="department" placeholder="Department" value={data.department} onChange={change} />
        <button className="btn btn-success w-100">Save</button>
      </form>
    </div>
  );
}
