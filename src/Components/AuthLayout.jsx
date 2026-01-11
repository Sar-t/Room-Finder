import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, protectedRoute = false }) => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Still checking auth state
    if (authStatus === undefined) return;

    if (protectedRoute && !authStatus) {
      navigate("/login", { replace: true });
    } else {
      setChecking(false);
    }
  }, [authStatus, protectedRoute, navigate]);

  if (checking) {
    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
      ">
        <div className="flex flex-col items-center gap-3">
          <div className="
            h-10 w-10
            border-4 border-blue-600
            border-t-transparent
            rounded-full
            animate-spin
          " />
          <span className="text-sm text-gray-500">
            Checking authentication…
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
