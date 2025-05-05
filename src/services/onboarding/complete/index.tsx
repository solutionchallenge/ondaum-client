import OnboardingAdditionalLayout from "../layout.tsx";
import { useAuthStore } from "../../../store/auth/index.ts";
import { useOnboardingAdditional } from "../../../hooks/onboarding/useOnboardingAdditional.ts";
import UmWithFriendImage from '../../../assets/images/image_umwithfriend.svg?react';
function OnboardingCompletePage() {
  const { user } = useAuthStore();
  const { goHomePage } = useOnboardingAdditional();

  return (
    <OnboardingAdditionalLayout
      title={
        <>
          <h2 className="text-lg text-font-color my-4 font-normal">
            {user?.name} 님,
          </h2>
          <p className="text-2xl font-bold text-font-color leading-snug mb-6">
            From now on, <br />
            I’d love to hear <br />
            your thoughts.
          </p>
        </>
      }
      button={{
        name: "Start",
        onPress: goHomePage,
      }}
    >
      <div className="flex flex-col items-center justify-center">
       <UmWithFriendImage/>
      </div>
    </OnboardingAdditionalLayout>
  );
}

export default OnboardingCompletePage;
