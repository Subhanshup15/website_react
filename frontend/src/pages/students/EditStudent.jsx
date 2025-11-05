import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    guardian_name: "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/${id}`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/students/${id}`, data);
    navigate("/students", { replace: true });
  };

  if (loading) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container p-4" style={{ maxWidth: "500px" }}>
      <h3>Edit Student</h3>

      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Full Name"
          value={data.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-2"
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={handleChange}
        />

        <input
          type="date"
          className="form-control mb-2"
          name="dob"
          value={data.dob}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="guardian_name"
          placeholder="Guardian Name"
          value={data.guardian_name}
          onChange={handleChange}
        />

        <button className="btn btn-warning w-100">Update</button>
      </form>
    </div>
  );
}
