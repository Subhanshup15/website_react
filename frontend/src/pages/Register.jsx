import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", { name, email, password, role });
      alert("Account Created ✅");
      navigate("/login");
    } catch (error) {
      console.log("Validation error:", error.response.data); // 👈 ADD THIS
    }
  };


  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h3 className="mb-3">Register</h3>

      <form onSubmit={registerUser}>
        <input className="form-control mb-2" placeholder="Name"
          value={name} onChange={(e) => setName(e.target.value)} />

        <input className="form-control mb-2" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input className="form-control mb-3" type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <select className="form-control mb-3" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button className="btn btn-success w-100">Register</button>
      </form>

      <Link to="/login" className="d-block mt-3">Back to Login</Link>
    </div>
  );
}
