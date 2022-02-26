import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"

const ProtectedRoute = ({ redirectTo, children } : { redirectTo: string, children: JSX.Element }) => {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  return isLogged ? children : <>{ navigate(redirectTo) }</>;
}

export default ProtectedRoute