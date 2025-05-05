import JoyIcon from "../../../../assets/images/icon_emotion_joy.svg?react";
import SadnessIcon from "../../../../assets/images/icon_emotion_sadness.svg?react";
import AngerIcon from "../../../../assets/images/icon_emotion_anger.svg?react";
import SurpriseIcon from "../../../../assets/images/icon_emotion_surprise.svg?react";
import FearIcon from "../../../../assets/images/icon_emotion_fear.svg?react";
import DisgustIcon from "../../../../assets/images/icon_emotion_disgust.svg?react";

export const EMOTION_ICONS = {
    joy: <JoyIcon/>,
    sadness: <SadnessIcon/>,
    anger: <AngerIcon/>,
    surprise: <SurpriseIcon/>,
    fear: <FearIcon/>,
    disgust: <DisgustIcon/>,    
  };

export const EMOTIONS = {
    joy: ['Enjoyment','Excitement','Contentment','Amusement',"Love","Hope","Interest","Trust","Pride"],
    sadness: ['Sadness','Gulit','Shame','Longing','Disappointment','Remorse','Compassion'],
    anger: ['Anger','Contempt','Jealousy','Desire'], 
    surprise: ['Suprise','Awe','Embarrassment'],
    fear: ['Fear','Anxiety'],
    disgust:['Disgust'],
   } as const;

export const EMOTION_KEYS = Object.keys(EMOTIONS) as (keyof typeof EMOTIONS)[];