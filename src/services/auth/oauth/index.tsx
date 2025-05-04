import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../../store/auth";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE_URL}/oauth/google/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to exchange code for token");
        return res.json();
      })
      .then(({ jwt, user }) => {
        localStorage.setItem("access_token", jwt);
        login({
          id: user.id,
          name: user.name,
          email: user.email,
        });
        navigate("/onboarding/basic");
      })
      .catch(() => {
        navigate("/login");
      });
  }, [login, navigate, searchParams]);

  return <div>로그인 처리 중입니다...</div>;
}

export default OAuthCallback;
