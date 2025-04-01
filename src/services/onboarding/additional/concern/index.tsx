import OnboardingAdditionalLayout from "../layout.tsx";
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
      title={
        <>
          <h2 className="text-lg text-gray-5 my-4 font-normal">
            {user?.name} 님,
          </h2>
          <p className="text-2xl font-semibold text-gray-5 leading-snug mb-6">
            Do you have <span className="text-orange-2">something</span>
            <br />
            on your mind ?
          </p>
        </>
      }
      button={{
        name: "Finish choosing your mind",
        onPress: goEmotionPage,
        subName: "I don't want to share my worries",
        disabled: isDisabled,
      }}
    >
      {CONCERN_KEY.map((key) => (
        <article key={key} className="mb-6">
          <h5 className="text-sm text-gray-5 mb-2 capitalize">{key}</h5>
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
