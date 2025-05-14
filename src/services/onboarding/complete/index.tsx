import OnboardingAdditionalLayout from "../layout.tsx";
import { useAuthStore } from "../../../store/auth/index.ts";
import { useOnboardingAdditional } from "../../../hooks/onboarding/useOnboardingAdditional.ts";
import UmWithFriendLottie from "../../../assets/lotties/lottie_um_with_friend.json";
import Lottie from "react-lottie-player";

function OnboardingCompletePage() {
  const { user } = useAuthStore();
  const { goHomePage } = useOnboardingAdditional();

  const goToHomePage = () => {
    goHomePage();
    window.location.reload();
  };

  return (
    <OnboardingAdditionalLayout
      backgroundImage={
        <Lottie
          loop
          animationData={UmWithFriendLottie}
          play
          style={{
            width: window.innerWidth < 480 ? "180%" : "100%",
            height: window.innerWidth < 480 ? "auto" : "800px",
            marginLeft: window.innerWidth < 480 ? "-40%" : 0,
          }}
        />
      }
      title={
        <>
          <h2 className="text-2xl text-font-color mt-6 mb-5 font-normal">
            {user?.username} 님,
          </h2>
          <p className="text-4xl font-bold text-font-color leading-snug mb-6">
            From now on, <br />
            <span className="text-second">
              I'd love to hear <br />
              your thoughts.
            </span>
          </p>
        </>
      }
      button={{
        name: "Start OnDaum",
        onPress: goToHomePage,
      }}
    ></OnboardingAdditionalLayout>
  );
}

export default OnboardingCompletePage;
