import OnboardingAdditionalLayout from "../../layout.tsx";
import { useAuthStore } from "../../../../store/auth";
import { useOnboardingAdditional } from "../../../../hooks/onboarding/useOnboardingAdditional.ts";
import { EMOTION_KEYS, EMOTION_ICONS, EMOTIONS } from "./constants.tsx";
import Accordian from "../../../../commons/surfaces/Accordian/index.tsx";
import CheckBox from "../../../../commons/inputs/CheckBox/index.tsx";
import { useEffect } from "react";
import {  EmotionTypes, getEmotion, updateUserAddition } from "../../../../api/onboarding/addition.ts";
import { useOnboardingConcernStore, useOnboarindgEmotionStore } from "../../../../store/onboarding/index.ts";

function OnboardingEmotionPage() {
  const { emotion, updateEmotion } = useOnboarindgEmotionStore();
  const { concern } = useOnboardingConcernStore();
  const { user } = useAuthStore();
  const { goCompletePage, goBackPage } = useOnboardingAdditional();


  console.log(emotion);
const fetchEmotions=async()=>{
  const {supported_emotions}=await getEmotion();
  console.log('response',  supported_emotions);
}

const fetchAddition = async()=>{
  const concernValues = Object.values(concern).flat();
  const emotionKeys = Object.keys(emotion).filter(
    (key) => !!emotion?.[key as EmotionTypes]?.length
  ) as EmotionTypes[];
  const response = await updateUserAddition(concernValues, emotionKeys);
  console.log('response', response);
}

  useEffect(()=>{
    fetchEmotions();
  },[]);

  const changeEmotion=(key:string, label:string, value:boolean)=>{
    if(value){
      updateEmotion({...emotion, [key]: [...(emotion[key as EmotionTypes] || []), label]});
    }else{
      updateEmotion({...emotion, [key]: emotion[key as EmotionTypes]?.filter((item: string)=>item!==label)});

    }
  }

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
            <span className="text-second">Choose your emotion.</span>
          </p>
        </>
      }
      button={{
        name: "Finish choosing your mind",
        onPress: ()=>{
          fetchAddition();
          goCompletePage();
        },
      }}
    >
      <section className="flex flex-col gap-3">
      {
      EMOTION_KEYS.map((key) => (
      <Accordian key={key} item={{
        icon: EMOTION_ICONS[key],
        label: key
      }}>
        <div key={key} className="flex flex-col gap-6">
          {
            EMOTIONS[key].map((option)=>(
            <CheckBox key={option} label={option} defaultChecked={!!emotion?.[key]?.includes(option)} onChange={(label, value)=>changeEmotion(key, label, value)} /> 
            ))
          }
        </div>
      </Accordian>
      ))}
      </section>
    </OnboardingAdditionalLayout>
  );
}

export default OnboardingEmotionPage;
