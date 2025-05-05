import OnboardingAdditionalLayout from "../layout.tsx";
import { useAuthStore } from "../../../store/auth/index.ts";
import { useOnboardingAdditional } from "../../../hooks/onboarding/useOnboardingAdditional.ts";
import UmWithFriendImage from '../../../assets/images/image_umWithFriend.png';

function OnboardingCompletePage() {
  const { user } = useAuthStore();
  const { goHomePage } = useOnboardingAdditional();

  return (
    <OnboardingAdditionalLayout
    backgroundImage={UmWithFriendImage}
      title={
        <>
          <h2 className="text-lg text-font-color my-4 font-normal">
            {user?.username} 님,
          </h2>
          <p className="text-2xl font-bold text-font-color leading-snug mb-6">
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
        onPress: goHomePage,
      }}
    >
      {/* <div className="w-screen h-[470px] bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${UmWithFriendImage})` }}/> */}
    </OnboardingAdditionalLayout>
  );
}

export default OnboardingCompletePage;
