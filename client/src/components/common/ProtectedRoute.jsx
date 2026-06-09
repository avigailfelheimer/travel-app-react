import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../context/userContext.jsx';

function ProtectedRoute() {
  const { user, isLoading } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const alertShown = useRef(false);

  useEffect(() => {
    if (!isLoading && !user && !alertShown.current) {
      const loggingOut = sessionStorage.getItem('loggingOut') === 'true';
      if (loggingOut) {
        sessionStorage.removeItem('loggingOut');
        return;
      }
      alertShown.current = true;
      alert('נא להתחבר כדי לגשת לדף זה');
      navigate('/login', { replace: true });
    }
  }, [isLoading, user, navigate, location.pathname]);

  if (isLoading) return null;
  if (!user) return null;

  return <Outlet />;
}

export default ProtectedRoute;
