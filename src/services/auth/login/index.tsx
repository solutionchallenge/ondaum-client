import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/auth";
import LoginButton from "../../../commons/inputs/Button/login";
import GlobalNavigation from "../../../commons/navigation/GlobalNavigation";

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
    <div>
      <GlobalNavigation />
      <main className="flex-1">
        <h2 className="text-base md:text-lg text-gray-5 my-4 font-normal">
          Hello
        </h2>
        <p className="text-3xl sm:text-3xl md:text-4xl font-bold font-[figtree] leading-tight sm:leading-[56px] pb-6 md:pb-8">
          Is this
          <br className="hidden sm:block" />
          your first time using
          <br />
          <span className="text-orange-2">OnDaum?</span>
        </p>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-normal leading-snug">
          You can sign up in just{" "}
          <span className="text-orange-2">one minute.</span>
        </p>
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-8">
          <LoginButton onClick={handleGoogleLogin} />
        </div>
      </main>
    </div>
  );
}
export default LoginPage;
