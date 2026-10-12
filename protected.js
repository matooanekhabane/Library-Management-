import { Navigate } from "react-router-dom";
import { useLib } from "../context/Library";

export default function Protected({ children, admin }) {
  const { user } = useLib();
  if (!user) return <Navigate to="/login" replace />;
  if (admin && user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}