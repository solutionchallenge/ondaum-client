import { ReactNode, FC, SVGProps } from "react";
import MinimalIcon from "../../../../assets/images/test/result/icon_minimal.svg?react";
import MildIcon from "../../../../assets/images/test/result/icon_mild.svg?react";
import ModerateIcon from "../../../../assets/images/test/result/icon_moderate.svg?react";
import ModeratelySevereIcon from "../../../../assets/images/test/result/icon_moderatelysevere.svg?react";
import SevereIcon from "../../../../assets/images/test/result/icon_severe.svg?react";

export const levelConfigs: Record<
  string,
  Record<
    string,
    {
      description: ReactNode;
      Icon: FC<SVGProps<SVGSVGElement>>;
    }
  >
> = {
  "PHQ-9": {
    Minimal: {
      description: (
        <>
          You're doing great! <br /> You seem emotionally balanced these days.
        </>
      ),
      Icon: MinimalIcon,
    },
    Mild: {
      description: (
        <>
          You've felt a little off lately. <br /> Small steps can make a big
          difference!
        </>
      ),
      Icon: MildIcon,
    },
    Moderate: {
      description: (
        <>
          You’ve been feeling a bit low. <br /> Let’s take a moment just for
          you.
        </>
      ),
      Icon: ModerateIcon,
    },
    "Moderately Severe": {
      description: (
        <>
          You've been through some tough days. <br /> You’re not alone, and
          support is here.
        </>
      ),
      Icon: ModeratelySevereIcon,
    },
    Severe: {
      description: (
        <>
          It must’ve been really difficult. <br /> Your feelings matter let’s
          talk about them.
        </>
      ),
      Icon: SevereIcon,
    },
  },
  "GAD-7": {
    Minimal: {
      description: (
        <>
          You're doing well. <br /> Keep taking care of yourself.
        </>
      ),
      Icon: MinimalIcon,
    },
    Mild: {
      description: (
        <>
          Some anxiety is present. <br /> Light self-care may help.
        </>
      ),
      Icon: MildIcon,
    },
    Moderate: {
      description: (
        <>
          Anxiety is more frequent. <br /> Stress support can help.
        </>
      ),
      Icon: ModerateIcon,
    },
    Severe: {
      description: (
        <>
          Anxiety may be strong. <br /> Consider professional support.
        </>
      ),
      Icon: SevereIcon,
    },
  },
  PSS: {
    "MildLow Stress": {
      description: (
        <>
          You seem to be handling stress well. <br /> Keep taking care of
          yourself.
        </>
      ),
      Icon: MildIcon,
    },
    "Moderate Stress": {
      description: (
        <>
          You seem to be handling stress well. <br /> Keep taking care of
          yourself.
        </>
      ),
      Icon: ModerateIcon,
    },
    "High Stress": {
      description: (
        <>
          Your stress levels seem quite high. It might
          <br /> be time to slow down or seek support.
        </>
      ),
      Icon: SevereIcon,
    },
  },
};
