import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;