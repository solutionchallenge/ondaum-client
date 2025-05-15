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
    <div className="flex flex-col h-screen overflow-hidden pt-16 justify-between z-0">
      <GlobalNavigation />
      <div className="relative z-10 p-[20px]">
        <main className="flex flex-col flex-1 relative z-0">
          <h2 className="text-[24px] text-font-color font-normal mb-5">
            Hello
          </h2>
          <p className="text-4xl font-extrabold font-[figtree] leading-tight sm:leading-[56px] mb-8">
            Is this
            <br />
            your first time
            <br />
            using <span className="text-second">OnDaum?</span>
          </p>
          <p className="text-[22px] text-font-color font-normal leading-snug pb-3">
            You can sign up in just{" "}
            <span className="text-main">one minute.</span>
          </p>
        </main>
      </div>
      <div className="sticky left-0 bottom-0 z-0">
        <Lottie
          loop
          animationData={UmLoginLottie}
          play
          style={{
            width: window.innerWidth < 480 ? "120%" : "100%",
            height: window.innerWidth < 480 ? "auto" : "800px",
            marginLeft: window.innerWidth < 480 ? "-10%" : 0,
            marginBottom: "-10%",
          }}
        />
      </div>
      <div className="fixed z-30 left-0 w-screen bottom-0 pt-4 pb-10 px-4 text-center bg-gradient-to-b from-transparent to-[#FFBE7DCC]">
        <LoginButton onClick={handleGoogleLogin} />
      </div>
    </div>
  );
}
export default LoginPage;
