import OnboardingAdditionalLayout from "../layout.tsx";
import { useAuthStore } from "../../../../store/auth";
import {
  CONCERN_KEY,
  CONCERN,
  useOnboardingConcernStore,
} from "../../../../store/onboarding";
import { useOnboardingAdditional } from "../../../../hooks/onboarding/useOnboardingAdditional.ts";

function OnboardingConcernPage() {
  const { user } = useAuthStore();
  const { concern, updateConcern } = useOnboardingConcernStore();
  const { goEmotionPage } = useOnboardingAdditional();

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
      }}
    >
      {CONCERN_KEY.map((key) => (
        <article key={key} className="mb-6">
          <h5 className="text-sm text-gray-5 mb-2 capitalize">{key}</h5>
          <div className="flex flex-wrap gap-2">
            {CONCERN[key].map((value: string) => {
              const isSelected = concern[key] === value;
              return (
                <button
                  key={value}
                  onClick={() => {
                    updateConcern({ ...concern, [key]: value });
                  }}
                  className={`px-4 py-2 rounded-full text-sm 
                      ${
                        isSelected
                          ? "bg-orange-2 text-white"
                          : "bg-gray-2 text-gray-5"
                      }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </article>
      ))}
    </OnboardingAdditionalLayout>
  );
}

export default OnboardingConcernPage;
