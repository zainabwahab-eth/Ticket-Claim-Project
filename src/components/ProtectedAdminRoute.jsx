import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

function ProtectedAdminRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedAdminRoute;
