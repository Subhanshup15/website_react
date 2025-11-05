import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container text-center py-5">

      <h1 className="mb-4">🎓 School ERP System</h1>
      <p className="mb-4">Welcome! Please login or register to continue.</p>

      <div className="d-flex justify-content-center gap-3">
        <Link to="/login" className="btn btn-primary btn-lg px-4">
          Login
        </Link>

        <Link to="/register" className="btn btn-success btn-lg px-4">
          Register
        </Link>
      </div>

    </div>
  );
}
