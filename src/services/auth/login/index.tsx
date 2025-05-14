import GlobalNavigation from "../../../commons/navigation/GlobalNavigation";
import LoginButton from "../../../commons/inputs/Button/login";
import { startGoogleLogin } from "../../../api/auth/login";
import Lottie from "react-lottie-player";
import UmLoginLottie from "../../../assets/lotties/lottie_um_login.json";

function LoginPage() {
  const handleGoogleLogin = () => {
    const redirectUri = `${window.location.origin}/oauth/google`;
    window.location.href = startGoogleLogin(redirectUri);
  };

  return (
    <div className="flex flex-col pt-16 justify-between h-screen overflow-hidden relative z-0 bg-white">
      <GlobalNavigation />
      <div className="relative z-10 p-[20px]">
        <main className="flex flex-col flex-1 relative z-0">
          <h2 className="text-[24px] text-font-color text-gray-5 font-normal mb-5">
            Hello
          </h2>
          <p className="text-4xl sm:text-4xl md:text-5xl font-extrabold font-[figtree] leading-tight sm:leading-[56px] mb-8">
            Is this
            <br />
            your first time
            <br />
            using <span className="text-second">OnDaum?</span>
          </p>
          <p className="text-[22px] text-font-color text-gray-600 font-normal leading-snug pb-3">
            You can sign up in just{" "}
            <span className="text-main">one minute.</span>
          </p>
        </main>
      </div>
      <div className="absolute inset-x-0 left-0 -bottom-1/3 w-full pointer-events-none z-0">
        <Lottie
          loop
          animationData={UmLoginLottie}
          play
          style={{
            width: "100%",
            height: "100vh",
          }}
        />
      </div>
      <div className="fixed bottom-0 w-full h-[150px] bg-gradient-to-b from-transparent to-[#FFBE7DCC] pointer-events-none" />
      <div className="fixed bottom-16 flex justify-center w-full z-10">
        <LoginButton onClick={handleGoogleLogin} />
      </div>
    </div>
  );
}
export default LoginPage;
