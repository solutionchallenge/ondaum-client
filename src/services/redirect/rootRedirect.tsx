import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetchUser } from "../../hooks/auth/useFetchUser";
import { User } from "../../store/auth";

const RootRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const result = useFetchUser(accessToken, refreshToken, undefined);
  const user = result.user as User | null;

  useEffect(() => {
    if (!user) return;

    const hasPrivacy = !!user.privacy;
    const hasAddition = !!user.addition?.concerns && !!user.addition?.emotions;
    const isComplete = hasPrivacy && hasAddition;

    if ((!accessToken && !refreshToken) || !user.email || user.id == null) {
      navigate("/login", { replace: true });
      return;
    }

    if (location.pathname === "/onboarding/basic") {
      if (isComplete) {
        navigate("/home", { replace: true });
      } else if (hasPrivacy && !hasAddition) {
        navigate("/onboarding/additional/concern", { replace: true });
      }
      return;
    }

    if (location.pathname === "/onboarding/additional/concern") {
      if (!hasPrivacy) {
        navigate("/onboarding/basic", { replace: true });
      } else if (isComplete) {
        navigate("/home", { replace: true });
      }
      return;
    }

    if (location.pathname === "/" || location.pathname === "/home") {
      if (!hasPrivacy) {
        navigate("/onboarding/basic", { replace: true });
      } else if (!hasAddition) {
        navigate("/onboarding/additional/concern", { replace: true });
      }
      return;
    }
  }, [navigate, location, accessToken, refreshToken, user]);

  return null;
};

export default RootRedirect;
