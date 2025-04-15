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
    <div className="fixed w-screen">
      <div className="absolute inset-0 z-5 translate-y-[25rem]">
        <AuthBg />
      </div>
      <div className="absolute inset-0 z-0 w-[393px] h-[250px] translate-y-[35rem] bg-gradient-to-b from-transparent to-[#FFBE7DCC] " />
      <div className="relative z-10 p-[20px]">
        <GlobalNavigation />

        <main className="flex-1">
          <h2 className="text-base sm:text-2xl text-gray-5 my-4 font-normal">
            Hello
          </h2>
          <p className="text-4xl sm:text-4xl md:text-5xl font-extrabold font-[figtree] leading-tight sm:leading-[56px] pb-6 md:pb-8">
            Is this
            <br className="hidden sm:block" />
            your first time
            <br />
            using <span className="text-orange-2">OnDaum?</span>
          </p>
          <p className="text-lg sm:text-2xl md:text-xl text-gray-600 font-normal leading-snug pb-8">
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
