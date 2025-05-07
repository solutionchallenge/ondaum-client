import CareerIcon from "../../../../assets/images/icon_concern_career.svg?react";
import PersonalIcon from "../../../../assets/images/icon_concern_personal.svg?react";
import SocialIcon from "../../../../assets/images/icon_concern_social.svg?react";

export const CONCERN_ICONS = {
    career: <CareerIcon/>,
    personal: <PersonalIcon/>,
    social: <SocialIcon/>,
  };

  export const CONCERNS = {
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

export const CONCERN_KEYS = Object.keys(CONCERNS) as (keyof typeof CONCERNS)[];
export const CONCERN_OPTIONS = Object.values(CONCERNS).flat();