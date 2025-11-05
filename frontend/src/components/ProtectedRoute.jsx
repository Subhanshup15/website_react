import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Not logged in → redirect to login
    if (!token || !user) return <Navigate to="/login" replace />;

    // Normalize role to lowercase
    const userRole = user?.roles?.[0]?.name?.toLowerCase();

    // Role not allowed → redirect based on actual role
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to={`/${userRole}`} replace />;
    }

    // ✅ If this route has children with nested routes, support <Outlet />
    return children || <Outlet />;
}
