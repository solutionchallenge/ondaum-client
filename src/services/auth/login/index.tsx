import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/auth";

// 실제 구글 OAuth 로그인은 예시로 대체 (Google API 통합은 별도)
function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    // 구글 OAuth 성공 시 받아온 사용자 정보로 로그인
    const mockUser = {
      id: "123",
      name: "홍길동",
      email: "test@example.com",
    };
    login(mockUser);
    navigate(from, { replace: true });
  };

  return (
    <div className="p-4 text-center">
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
export default LoginPage;
