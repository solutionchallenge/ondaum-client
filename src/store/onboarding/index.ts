import { create } from "zustand/react";

export const CONCERN = {
  career: [
    "Choice",
    "Transition",
    "Satisfaction",
    "Stress",
    "Security",
    "Promotion",
  ],
  personal: [
    "Relationships",
    "Identity",
    "Health",
    "Finance",
    "Meaning",
    "Satisfaction",
  ],
  social: [
    "Responsibility",
    "Environment",
    "Politics",
    "Culture",
    "Inequality",
    "Community",
  ],
};

export const CONCERN_KEY = Object.keys(CONCERN) as (keyof typeof CONCERN)[];

type ConcernType = {
  [key in keyof typeof CONCERN]?: string;
};

export const useOnboardingConcernStore = create<{
  concern: ConcernType;
  updateConcern: (value: ConcernType) => void;
}>((set) => ({
  concern: {
    career: "Satisfaction",
    social: undefined,
    personal: undefined,
  },
  updateConcern: (value) => set(() => ({ concern: value })),
}));

export const useOnboardingEmotionStore = create<{
  emotion: string;
  updateEmotion: (value: string) => void;
}>((set) => ({
  emotion: "",
  updateEmotion: (value) => set(() => ({ emotion: value })),
}));
