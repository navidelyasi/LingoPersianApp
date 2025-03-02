import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("user-token");

  if (token) {
    return <Navigate to="/menu-halloween" replace />;
  }

  return children;
}
