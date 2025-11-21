import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    // not logged in → redirect to login
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    // role mismatch → redirect to dashboard
    return <Navigate to="/" />;
  }

  return children; // allowed
}

export default ProtectedRoute;
