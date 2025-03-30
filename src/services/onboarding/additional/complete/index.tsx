import OnboardingAdditionalLayout from "../layout.tsx";
import { useAuthStore } from "../../../../store/auth";
import useOnboardingAdditional from "../../../../hooks/onboarding/useOnboardingAdditional.ts";

function OnboardingCompletePage() {
  const { user } = useAuthStore();
  const { goHome } = useOnboardingAdditional();

  return (
    <OnboardingAdditionalLayout
      title={
        <>
          <h2 className="text-lg text-gray-5 my-4 font-normal">
            {user?.name} 님,
          </h2>
          <p className="text-2xl font-bold text-gray-5 leading-snug mb-6">
            From now on, <br />
            I’d love to hear <br />
            your thoughts.
          </p>
        </>
      }
      button={{
        name: "Start",
        onPress: goHome,
      }}
    >
      image
    </OnboardingAdditionalLayout>
  );
}

export default OnboardingCompletePage;
