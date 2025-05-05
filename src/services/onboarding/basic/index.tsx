import Toggle from "../../../commons/inputs/ToggleButton";
import ToggleGroup from "../../../commons/inputs/ToggleButton/group";
import { DatePickers } from "../../../commons/mui-x/DatePickers";
import { useOnboardingAdditional } from "../../../hooks/onboarding/useOnboardingAdditional";
import { useAuthStore } from "../../../store/auth";
import OnboardingAdditionalLayout from "../layout";
import { useState } from "react";

const GENDER_LIST = ["male", "female", "etc"];

function OnboardingBasicPage() {
  const { user } = useAuthStore();
  const { goConcernPage } = useOnboardingAdditional();
  const [concern, setConcern] = useState<Record<string, string>>({});
  const [isBirthModalOpen, setIsBirthModalOpen] = useState(false);
  const updateConcern = (newConcern: Record<string, string>) => {
    setConcern(newConcern);
  };

  return (
    <OnboardingAdditionalLayout
      title={
        <>
          <h2 className="text-2xl text-font-color my-4 font-normal">
            To get to know you better,
            <br />
            {user?.name}
          </h2>
          <p className="text-4xl font-semibold font-[Open_Sans] text-font-color leading-[50.40px] mb-6">
            Could you provide
            <br />
            {"some" + " "}
            <span className="text-second">
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
        <Toggle
          selected={!!concern.birth}
          onClick={() => setIsBirthModalOpen(true)}
        >
          {concern.birth ? concern.birth : "Select birth"}
        </Toggle>
        {isBirthModalOpen && (
          <DatePickers
            selectedDate={concern.birth ? new Date(concern.birth) : undefined}
            onSelectDate={(date) => {
              updateConcern({
                ...concern,
                birth: `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`,
              });
              setIsBirthModalOpen(false);
            }}
          />
        )}
      </article>
    </OnboardingAdditionalLayout>
  );
}
export default OnboardingBasicPage;
