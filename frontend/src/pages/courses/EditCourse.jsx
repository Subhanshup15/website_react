import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ code: "", name: "", credit: "" });

  useEffect(() => {
    api.get(`/courses/${id}`).then(res => setData(res.data));
  }, [id]);

  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/courses/${id}`, data);
    navigate("/courses");
  };

  return (
    <div className="container p-4" style={{ maxWidth: "500px" }}>
      <h3>Edit Course</h3>

      <form onSubmit={submit}>
        <input className="form-control mb-2" placeholder="Course Code" name="code" value={data.code} onChange={change} required />
        <input className="form-control mb-2" placeholder="Course Name" name="name" value={data.name} onChange={change} required />
        <input className="form-control mb-2" placeholder="Credit"  name="credit" value={data.credit} onChange={change} />
        <button className="btn btn-warning w-100">Update</button>
      </form>
    </div>
  );
}
