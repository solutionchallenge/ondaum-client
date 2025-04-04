import OnboardingAdditionalLayout from "../layout.tsx";
import { useAuthStore } from "../../../../store/auth";
import { useOnboardingEmotionStore } from "../../../../store/onboarding";
import { useOnboardingAdditional } from "../../../../hooks/onboarding/useOnboardingAdditional.ts";

function OnboardingEmotionPage() {
  const { emotion } = useOnboardingEmotionStore();
  const { user } = useAuthStore();
  const { goCompletePage, goBackPage } = useOnboardingAdditional();

  return (
    <OnboardingAdditionalLayout
      title={
        <>
          <div onClick={goBackPage}> {"<"}</div>
          <h2 className="text-lg text-gray-5 my-4 font-normal">
            {user?.name} 님,
          </h2>
          <p className="text-2xl font-semibold text-gray-5 leading-snug mb-6">
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
    >
      {emotion}
    </OnboardingAdditionalLayout>
  );
}

export default OnboardingEmotionPage;
