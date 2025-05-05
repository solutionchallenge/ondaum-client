import OnboardingAdditionalLayout from "../../layout.tsx";
import { useAuthStore } from "../../../../store/auth";
import { useOnboardingEmotionStore } from "../../../../store/onboarding";
import { useOnboardingAdditional } from "../../../../hooks/onboarding/useOnboardingAdditional.ts";

function OnboardingEmotionPage() {
  const { emotion } = useOnboardingEmotionStore();
  const { user } = useAuthStore();
  const { goCompletePage, goBackPage } = useOnboardingAdditional();

  return (
    <OnboardingAdditionalLayout
      currentStepNumber={2}
      navigation={goBackPage}
      title={
        <>
          <h2 className="text-lg text-font-color my-4 font-normal">
            {user?.username} 님,
          </h2>
          <p className="text-2xl font-semibold text-font-color leading-snug mb-6">
            It’s time to
            <br />
            Choose your emotion.
          </p>
        </>
      }
      button={{
        name: "Finish choosing your mind",
        onPress: goCompletePage,
      }}
      currentStep={3}
    >
      {emotion}
    </OnboardingAdditionalLayout>
  );
}

export default OnboardingEmotionPage;
