import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SuperAdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== "superadmin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SuperAdminRoute;