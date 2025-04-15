import ToggleGroup from "../../../commons/inputs/ToggleButton/group";
import { useOnboardingAdditional } from "../../../hooks/onboarding/useOnboardingAdditional";
import { useAuthStore } from "../../../store/auth";
import OnboardingAdditionalLayout from "../additional/layout";
import { useState } from "react";

const GENDER_LIST = ["male", "female", "etc"];

function OnboardingBasicPage() {
  const { user } = useAuthStore();
  const { goConcernPage } = useOnboardingAdditional();
  const [concern, setConcern] = useState<Record<string, string>>({});
  const updateConcern = (newConcern: Record<string, string>) => {
    setConcern(newConcern);
  };

  return (
    <OnboardingAdditionalLayout
      title={
        <>
          <h2 className="text-2xl text-gray-5 my-4 font-normal">
            To get to know you better,
            <br />
            {user?.name}
          </h2>
          <p className="text-4xl font-semibold font-[Open_Sans] text-gray-5 leading-[50.40px] mb-6">
            Could you provide
            <br />
            {"some" + " "}
            <span className="text-orange-2">
              simple
              <br />
              information?
            </span>
          </p>
        </>
      }
      button={{
        name: "Enter your information",
        onPress: goConcernPage,
      }}
    >
      <article className="mb-6">
        <h5 className="text-xl font-['Pretendard'] font-bold mb-2">Sex</h5>
        <ToggleGroup
          options={GENDER_LIST}
          selectedOption={concern.gender || ""}
          onSelect={(value) => updateConcern({ ...concern, gender: value })}
        />
      </article>
      <article className="mb-6">
        <h5 className="text-xl font-['Pretendard'] font-bold mb-2">Birth</h5>
        {/* TODO : 생년월일 선택 모달 및 버튼 만들기 */}
      </article>
    </OnboardingAdditionalLayout>
  );
}
export default OnboardingBasicPage;
