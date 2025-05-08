import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetchUser } from "../../../hooks/auth/useFetchUser";
import { exchangeGoogleCode } from "../../../api/auth/login";

function OAuthCallback() {
  const redirectUri = `${window.location.origin}/oauth/google`;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      navigate("/login");
      return;
    }

    exchangeGoogleCode(code, redirectUri)
      .then(({ access_token, refresh_token }) => {
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate, redirectUri, searchParams]);

  useFetchUser(accessToken, refreshToken, () => {
    navigate("/onboarding/basic");
  });

  return (
    <>
      <div className="bg-white"></div>
    </>
  );
}

export default OAuthCallback;
