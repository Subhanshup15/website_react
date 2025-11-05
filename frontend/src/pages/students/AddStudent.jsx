import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    guardian_name: ""
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/students", data);
    navigate("/students", { replace: true });
  };

  return (
    <div className="container p-4" style={{ maxWidth: "500px" }}>
      <h3>Add Student</h3>
      <form onSubmit={submit}>
        {Object.keys(data).map((key) => (
          <input
            key={key}
            className="form-control mb-2"
            name={key}
            placeholder={key.replace("_", " ").toUpperCase()}
            value={data[key]}
            onChange={handleChange}
            required
          />
        ))}
        <button className="btn btn-success w-100">Save</button>
      </form>
    </div>
  );
}
