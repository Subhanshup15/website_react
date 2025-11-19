import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // <-- ❗ Add error state

  const loginUser = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    try {
      const res = await api.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.roles[0].name;

      if (role === "admin") navigate("/admin", { replace: true });
      else if (role === "teacher") navigate("/teacher", { replace: true });
      else navigate("/student", { replace: true });

    } catch (err) {
      // ❌ Show error message if login fails
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid email or password");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Login</h3>

      {/* ❗ Show error alert */}
      {error && (
        <div className="alert alert-danger py-2">
          {error}
        </div>
      )}

      <form onSubmit={loginUser}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <i
            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
            style={{
              right: "10px",
              top: "10px",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>

      <Link to="/register" className="d-block mt-3">
        Create Account
      </Link>
    </div>
  );
}
