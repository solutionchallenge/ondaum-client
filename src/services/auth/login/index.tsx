import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/auth";
import LoginButton from "../../../commons/inputs/Button/login";
import GlobalNavigation from "../../../commons/navigation/GlobalNavigation";
import AuthBg from "../../../assets/images/auth_image.svg?react";

function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
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
      {/* 배경 SVG */}
      <div className="absolute inset-0 z-10 translate-y-32">
        <AuthBg />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="relative z-10 p-[20px]">
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

          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg translate-y-72">
            <LoginButton onClick={handleGoogleLogin} />
          </div>
        </main>
      </div>
    </div>
  );
}
export default LoginPage;
