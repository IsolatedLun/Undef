import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"

const ProtectedRoute = ({ redirectTo, children, condition } : 
  { redirectTo: string, children: JSX.Element, condition?: boolean }) => {

  const { isLogged, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogged && user === undefined)
      navigate(redirectTo);

    else if(condition !== undefined && !condition)
      navigate('/404');
  }, [isLogged])

  return (isLogged && condition) ? children : <></>;
}

export default ProtectedRoute