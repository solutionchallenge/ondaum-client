import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../../store/auth";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      fetch(`${API_BASE_URL}/user/self`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user");
          return res.json();
        })
        .then((user) => {
          login({
            id: user.id,
            name: user.username,
            email: user.email,
          });
          console.log(user);
          navigate("/onboarding/basic");
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [login, navigate, searchParams]);

  return <div>로그인 처리 중입니다...</div>;
}

export default OAuthCallback;
