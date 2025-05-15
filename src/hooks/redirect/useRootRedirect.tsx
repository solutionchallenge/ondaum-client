import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetchUser } from "../../hooks/auth/useFetchUser";

const useRootRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const { user, loading } = useFetchUser(accessToken, refreshToken, undefined);

  useEffect(() => {
    if (loading || !user) return;

    const hasPrivacy = !!user.privacy;

    const hasConcerns = !!user.addition?.concerns;
    const hasEmotions = !!user.addition?.emotions;

    if ((!accessToken && !refreshToken) || !user.email || user.id == null) {
      navigate("/login", { replace: true });
      return;
    }

    if (
      location.pathname === "" ||
      location.pathname === "/" ||
      location.pathname === "/home"
    ) {
      if (!hasPrivacy) {
        navigate("/onboarding/basic", { replace: true });
      } else if (!hasConcerns || !hasEmotions) {
        navigate("/onboarding/additional/concern", { replace: true });
      }
      return;
    }
  }, [navigate, location, accessToken, refreshToken, user, loading]);

  return null;
};

export default useRootRedirect;
