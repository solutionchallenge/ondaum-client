import AngerIcon from "../../../../assets/images/chatresult/icon_anger.svg?react";
import FearIcon from "../../../../assets/images/chatresult/icon_fear.svg?react";
import SadnessIcon from "../../../../assets/images/chatresult/icon_sadness.svg?react";
import JoyIcon from "../../../../assets/images/chatresult/icon_joy.svg?react";
import DisgustIcon from "../../../../assets/images/chatresult/icon_disgust.svg?react";
import SurpriseIcon from "../../../../assets/images/chatresult/icon_surprise.svg?react";

export function EmotionIcon({emotion, className}: {emotion: string, className?: string}) {
  switch(emotion) {
    case "anger":
      return <AngerIcon className={className} />
    case "fear":
      return <FearIcon className={className} />
    case "sadness":
      return <SadnessIcon className={className} />
    case 'joy':
      return <JoyIcon className={className} />
    case 'disgust':
      return <DisgustIcon className={className} />
    case 'surprise':
      return <SurpriseIcon className={className} />
  }
}   
