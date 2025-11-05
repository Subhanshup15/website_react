import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    department: "",
  });

  useEffect(() => {
    api.get(`/teachers/${id}`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [id]);

  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/teachers/${id}`, data);
    navigate("/teachers");
  };

  if (loading) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container p-4" style={{ maxWidth: "500px" }}>
      <h3>Edit Teacher</h3>

      <form onSubmit={submit}>
        <input className="form-control mb-2" name="name" placeholder="Name" value={data.name} onChange={change} required />
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" value={data.email} onChange={change} required />
        <input className="form-control mb-2" name="phone" placeholder="Phone" value={data.phone} onChange={change} />
        <input className="form-control mb-2" name="qualification" placeholder="Qualification" value={data.qualification} onChange={change} />
        <input className="form-control mb-2" name="department" placeholder="Department" value={data.department} onChange={change} />
        <button className="btn btn-warning w-100">Update</button>
      </form>
    </div>
  );
}
