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
      <main className="pb-44">
        <h2 className="text-lg text-gray-5 my-4 font-normal pb-[20px]">
          Hello
        </h2>
        <p className="text-[40px] font-bold font-['Figtree'] leading-[56px] pb-[32px]">
          Is this
          <br />
          your first time using
          <br />
          <span className="text-orange-2">OnDaum?</span>
        </p>
        <p className="text-font-color text-[22px] font-normal font-['Pretendard'] leading-[30.80px]">
          {"You can sign up in just" + " "}
          <span className="text-orange-2">one minute.</span>
        </p>
        <div className="fixed w-screen bottom-16 py-4 px-4 text-center">
          <LoginButton onClick={handleGoogleLogin} />
        </div>
      </main>
    </div>
  );
}
export default LoginPage;
