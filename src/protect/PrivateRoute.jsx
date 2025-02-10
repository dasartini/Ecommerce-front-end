import { Navigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { authToken } = useAuthContext();

  return authToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
