import { create } from "zustand/react";
import { CONCERNS } from "../../services/onboarding/additional/concern/constants";
import { EMOTIONS } from "../../services/onboarding/additional/emotion/constants";

type ConcernType = {
  [key in keyof typeof CONCERNS]?: string[];
};

type EmotionType = {
  [key in keyof typeof EMOTIONS]?: string[];
};

export const useOnboarindgEmotionStore = create<{
  emotion: EmotionType;
  updateEmotion: (value: EmotionType) => void;
}>((set) => ({
  emotion: {
    joy: [],
    sadness: [],
    anger: [],
    surprise: [],
    fear: [],
    disgust: [],
  },
  updateEmotion: (emotion) => set(() => ({ emotion: emotion })),
}));

export const useOnboardingConcernStore = create<{
  concern: ConcernType;
  updateConcern: (value: ConcernType) => void;
}>((set) => ({
  concern: {
    career: [],
    social: [],
    personal: [],
  },
  updateConcern: (concern) => set(() => ({ concern: concern })),
}));
