import OnboardingAdditionalLayout from "../../layout.tsx";
import { useAuthStore } from "../../../../store/auth";
import {
  CONCERN_KEY,
  CONCERN,
  useOnboardingConcernStore,
} from "../../../../store/onboarding";
import { useOnboardingAdditional } from "../../../../hooks/onboarding/useOnboardingAdditional.ts";
import ToggleGroup from "../../../../commons/inputs/ToggleButton/group.tsx";

function OnboardingConcernPage() {
  const { user } = useAuthStore();
  const { concern, updateConcern } = useOnboardingConcernStore();
  const { goEmotionPage } = useOnboardingAdditional();

  // 최소 한 개라도 선택했는지 확인하여 버튼 활성화 여부 설정
  const isDisabled = !Object.values(concern).some((val) => val);

  return (
    <OnboardingAdditionalLayout 
      currentStepNumber={1}
      title={
        <>
          <h2 className="text-lg text-font-color my-4 font-normal">
            {user?.username} 님,
          </h2>
          <p className="text-2xl font-semibold text-font-color leading-snug mb-6">
            Do you have <br />
            <span className="text-second">something</span> on your mind ?
          </p>
        </>
      }
      button={{
        name: "Finish choosing your mind",
        onPress: goEmotionPage,
        subName: "I don't want to share my worries",
        disabled: isDisabled,
      }}
      currentStep={2}
    >
      {CONCERN_KEY.map((key) => (
        <article key={key} className="mb-6">
          <h5 className="text-sm text-font-color mb-2 capitalize">{key}</h5>
          <ToggleGroup
            options={CONCERN[key]}
            selectedOption={concern[key] || ""}
            onSelect={(value) => updateConcern({ ...concern, [key]: value })}
          />
        </article>
      ))}
    </OnboardingAdditionalLayout>
  );
}

export default OnboardingConcernPage;
