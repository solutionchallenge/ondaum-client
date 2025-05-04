import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth";
import LoginButton from "../../../commons/inputs/Button/login";
import GlobalNavigation from "../../../commons/navigation/GlobalNavigation";
import AuthBg from "../../../assets/images/img_login.svg?react";

function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const mockUser = {
      id: "123",
      name: "홍길동",
      email: "test@example.com",
    };
    login(mockUser);
    navigate("/onboarding/basic");
  };

  return (
    <div className="flex flex-col justify-between min-h-screen relative overflow-hidden z-0 bg-white">
      <GlobalNavigation />
      <div className="relative z-10 p-[20px]">
        <main className="flex flex-col flex-1 relative z-0">
          <h2 className="text-[24px] text-font-color text-gray-5 my-4 font-normal">
            Hello
          </h2>
          <p className="text-4xl sm:text-4xl md:text-5xl font-extrabold font-[figtree] leading-tight sm:leading-[56px] pb-6 md:pb-8">
            Is this
            <br />
            your first time
            <br />
            using <span className="text-second">OnDaum?</span>
          </p>
          <p className="text-[22px] text-font-color text-gray-600 font-normal leading-snug pb-8">
            You can sign up in just{" "}
            <span className="text-main">one minute.</span>
          </p>
        </main>
      </div>
      <div className="flex relative">
        <div className="w-full max-w-[393px] relative">
          <AuthBg className="w-full h-auto" />
          <div className="absolute inset-0 flex mt-[80%] w-full">
            <div className="absolute bottom-0 w-full h-[150px] bg-gradient-to-b from-transparent to-[#FFBE7DCC] pointer-events-none" />
            <div className="flex justify-center w-full z-10">
              <LoginButton onClick={handleGoogleLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
