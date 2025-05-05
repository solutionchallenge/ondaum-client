import IconEnd from "../../../../../assets/images/test/solution/icon_end.svg?react";
import IconTalk from "../../../../../assets/images/test/solution/icon_talk.svg?react";
import { JSX } from "react";

type SolutionItem = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  onClick?: () => void;
};

type SolutionMap = {
  [key in "stress"]: {
    [level in "positive" | "negative"]: SolutionItem[];
  };
};

const solutionMap: SolutionMap = {
  stress: {
    positive: [
      {
        id: "stress-positive-1",
        title: "Let's talk with Um.",
        description: "Let's talk about the situation with Um.",
        icon: <IconTalk />,
      },
      {
        id: "stress-positive-2",
        title: "End the test",
        description: "Finish the test and rest.",
        icon: <IconEnd />,
      },
    ],
    negative: [
      {
        id: "stress-negative-1",
        title: "Talk to a Counselor",
        description: "Professional support, when you need it",
        icon: <IconEnd />,
      },
      {
        id: "stress-negative-2",
        title: "Let's talk about the problem",
        description: "Let's talk about the problem with Um.",
        icon: <IconTalk />,
      },
    ],
  },
};

export default solutionMap;
