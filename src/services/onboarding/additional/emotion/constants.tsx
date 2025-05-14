import JoyIcon from "../../../../assets/images/chatresult/icon_joy.svg?react";
import SadnessIcon from "../../../../assets/images/chatresult/icon_sadness.svg?react";
import AngerIcon from "../../../../assets/images/chatresult/icon_anger.svg?react";
import SurpriseIcon from "../../../../assets/images/chatresult/icon_surprise.svg?react";
import FearIcon from "../../../../assets/images/chatresult/icon_fear.svg?react";
import DisgustIcon from "../../../../assets/images/chatresult/icon_disgust.svg?react";

export const EMOTION_ICONS = {
  joy: <JoyIcon color="#F57C00" className="w-7 w-7" />,
  sadness: <SadnessIcon color="#F57C00" className="w-7 w-7" />,
  anger: <AngerIcon color="#F57C00" className="w-7 w-7" />,
  surprise: <SurpriseIcon color="#F57C00" className="w-7 w-7" />,
  fear: <FearIcon color="#F57C00" className="w-7 w-7" />,
  disgust: <DisgustIcon color="#F57C00" className="w-7 w-7" />,
};

export const EMOTIONS = {
  joy: [
    "Enjoyment",
    "Excitement",
    "Contentment",
    "Amusement",
    "Love",
    "Hope",
    "Interest",
    "Trust",
    "Pride",
  ],
  sadness: [
    "Sadness",
    "Gulit",
    "Shame",
    "Longing",
    "Disappointment",
    "Remorse",
    "Compassion",
  ],
  anger: ["Anger", "Contempt", "Jealousy", "Desire"],
  surprise: ["Suprise", "Awe", "Embarrassment"],
  fear: ["Fear", "Anxiety"],
  disgust: ["Disgust"],
} as const;

export const EMOTION_KEYS = Object.keys(EMOTIONS) as (keyof typeof EMOTIONS)[];
