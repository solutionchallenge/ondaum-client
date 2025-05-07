import OnboardingAdditionalLayout from "../../layout.tsx";
import { useAuthStore } from "../../../../store/auth";
import {
  CONCERNS,
  CONCERN_KEYS,
  CONCERN_ICONS,
} from "./constants.tsx";
import { useOnboardingAdditional } from "../../../../hooks/onboarding/useOnboardingAdditional.ts";
import Accordion from "../../../../commons/surfaces/Accordion/index.tsx";
import { useOnboardingConcernStore } from "../../../../store/onboarding/index.ts";
import CheckBox from "../../../../commons/inputs/CheckBox/index.tsx";
import { Link } from "react-router-dom";
import { ConcernTypes } from "../../../../api/onboarding/addition.ts";
function OnboardingConcernPage() {
  const { user } = useAuthStore();
  const { concern, updateConcern } = useOnboardingConcernStore();
  const { goEmotionPage } = useOnboardingAdditional();

  const concernChange=(key:string, label:string, value:boolean)=>{
    if(value){
      updateConcern({...concern, [key]: [...(concern[key as ConcernTypes] || []), label]});
    }else{
      updateConcern({...concern, [key]: concern[key as ConcernTypes]?.filter((item: string)=>item!==label)});
    }
  }

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
      toast={{
        message: <>Select {Object.values(concern).flat().length} something in total</>,
        type: "warning",
      }}
      button={{
        name: "Finish choosing your mind",
        onPress:()=>{
          goEmotionPage();
        } ,
      }}
    >
      <section className="flex flex-col gap-3">
      {
      CONCERN_KEYS.map((key) => (
      <Accordion key={key} item={{
      icon: CONCERN_ICONS[key],
        label: key
      }}>
        <div className="flex flex-col gap-6">
          {
            CONCERNS[key].map((option)=>(
            <CheckBox key={option} label={option} defaultChecked={!!concern?.[key]?.includes(option)} onChange={(label, value)=>concernChange(key, label,value)} /> 
            ))
          }
        </div>
      </Accordion>
      ))}
      <Link to="/home" className="text-sm text-second text-center underline mt-4">
        I don't want to share my worries
      </Link>
      </section>
    </OnboardingAdditionalLayout>
  );
}

export default OnboardingConcernPage;
