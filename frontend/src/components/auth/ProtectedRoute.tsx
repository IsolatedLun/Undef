import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"

const ProtectedRoute = ({ redirectTo, children } : { redirectTo: string, children: JSX.Element }) => {
  const { isLogged, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogged && user === undefined)
      navigate(redirectTo);
  }, [isLogged])

  return isLogged ? children : <></>;
}

export default ProtectedRoute