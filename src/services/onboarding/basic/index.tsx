import Toggle from "../../../commons/inputs/ToggleButton";
import ToggleGroup from "../../../commons/inputs/ToggleButton/group";
import { DatePickers } from "../../../commons/mui-x/DatePickers";
import { useOnboardingAdditional } from "../../../hooks/onboarding/useOnboardingAdditional";
import { updateUserPrivacy } from "../../../api/onboarding/basic";
import { useAuthStore } from "../../../store/auth/index";
import OnboardingAdditionalLayout from "../layout";
import { useState } from "react";
import { GENDERS } from "./constant";

function OnboardingBasicPage() {
  const { user } = useAuthStore();
  const { goConcernPage } = useOnboardingAdditional();
  const [privacy, setPrivacy] = useState<Record<string, string>>({});
  const [isBirthModalOpen, setIsBirthModalOpen] = useState(false);

  const handleConfirm = () => {
    if (privacy.birth && privacy.gender) {
      const response = updateUserPrivacy(privacy.birth, privacy.gender);
      console.log("response", response);
      goConcernPage();
    }
  };

  return (
    <OnboardingAdditionalLayout
      title={
        <>
          <h2 className="text-2xl text-font-color my-4 font-normal">
            To get to know you better,
            <br />
            {user?.username}
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
        onPress: handleConfirm,
      }}
    >
      <article className="mb-6">
        <h5 className="text-xl font-['Pretendard'] font-bold mb-2">Sex</h5>
        <ToggleGroup
          options={GENDERS}
          selectedOption={privacy.gender || ""}
          onSelect={(value) =>
            setPrivacy((prev) => ({ ...prev, gender: value }))
          }
        />
      </article>
      <article className="mb-6">
        <h5 className="text-xl font-['Pretendard'] font-bold mb-2">Birth</h5>
        <Toggle
          selected={!!privacy.birth}
          onClick={() => setIsBirthModalOpen((prev) => !prev)}
        >
          {privacy.birth ? privacy.birth : "Select birth"}
        </Toggle>
        {isBirthModalOpen && (
          <DatePickers
            selectedDate={privacy.birth ? new Date(privacy.birth) : undefined}
            onSelectDate={(date) => {
              setPrivacy((prev) => ({
                ...prev,
                birth: `${date.getFullYear()}-${(date.getMonth() + 1)
                  .toString()
                  .padStart(
                    2,
                    "0"
                  )}-${date.getDate().toString().padStart(2, "0")}`,
              }));
              setIsBirthModalOpen(false);
            }}
          />
        )}
      </article>
    </OnboardingAdditionalLayout>
  );
}
export default OnboardingBasicPage;
