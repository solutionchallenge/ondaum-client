import AngerIcon from "../../../../assets/images/chatresult/icon_anger.svg?react";
import FearIcon from "../../../../assets/images/chatresult/icon_fear.svg?react";
import SadnessIcon from "../../../../assets/images/chatresult/icon_sadness.svg?react";
import JoyIcon from "../../../../assets/images/chatresult/icon_joy.svg?react";
import DisgustIcon from "../../../../assets/images/chatresult/icon_disgust.svg?react";
import SurpriseIcon from "../../../../assets/images/chatresult/icon_surprise.svg?react";

export function EmotionIcon({
  emotion,
  className,
}: {
  emotion: string;
  className?: string;
}) {
  switch (emotion) {
    case "anger":
      return <AngerIcon color="#274B7A" className={className} />;
    case "fear":
      return <FearIcon color="#5C6BC0" className={className} />;
    case "sadness":
      return <SadnessIcon color="#4A90E2" className={className} />;
    case "joy":
      return <JoyIcon color="#FFD900" className={className} />;
    case "disgust":
      return <DisgustIcon color="#8E837E" className={className} />;
    case "surprise":
      return <SurpriseIcon color="#CFC5B4" className={className} />;
  }
}
