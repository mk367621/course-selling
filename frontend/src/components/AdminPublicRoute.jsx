import { Navigate } from "react-router-dom";

function AdminPublicRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (token) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
}

export default AdminPublicRoute;
