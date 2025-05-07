import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { useFetchUser } from "../../hooks/auth/useFetchUser";

const RootRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const isUserIncomplete = !user || !user.privacy || !user.addition;

  useFetchUser(accessToken, refreshToken, undefined, isUserIncomplete);

  useEffect(() => {
    if (
      location.pathname.startsWith("/oauth") ||
      location.pathname === "/login" ||
      location.pathname === "/onboarding/basic" ||
      location.pathname === "/onboarding/additional/concern" ||
      location.pathname === "/onboarding/additional/emotion" ||
      location.pathname === "/onboarding/complete"
    ) {
      return;
    }

    if (!user) return;

    if (!user.email || user.id === null || user.id === undefined) {
      navigate("/login", { replace: true });
      return;
    }

    if (location.pathname === "/home") {
      if (!user.addition?.concerns || !user.addition?.emotions) {
        navigate("/onboarding/additional/concern", { replace: true });
        return;
      }
    }

    if (location.pathname === "/onboarding/additional/concern") {
      if (user.addition?.concerns && user.addition?.emotions) {
        navigate("/home", { replace: true });
        return;
      }
    }
  }, [user, navigate, location]);

  return null;
};

export default RootRedirect;
