import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetchUser } from "../../../hooks/auth/useFetchUser";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

    fetch(
      `${API_BASE_URL}/oauth/google/auth?redirect=${encodeURIComponent(redirectUri)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to exchange code for token");
        return res.json();
      })
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
