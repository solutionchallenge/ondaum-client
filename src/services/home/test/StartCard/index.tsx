import React from "react";
import phqIcon from "../../../../assets/images/test/img_phq_start.svg?react";
import pssIcon from "../../../../assets/images/test/img_pss_start.svg?react";
import gadIcon from "../../../../assets/images/test/img_gad_start.svg?react";

interface StartCardProps {
  type: "phq-9" | "pss" | "gad-7";
}

const CONTENT = {
  "phq-9": {
    description:
      "PHQ-9 is a clinically validated questionnaire used to screen for depression.",
    icon: phqIcon,
    notes: [
      "9 quick questions for your well-being.",
      "There are no right or wrong answers.",
      "Your answers will stay private.",
    ],
  },
  pss: {
    description:
      "PSS is a widely used tool for measuring the perception of stress.",
    icon: pssIcon,
    notes: [
      "Takes less than 3 minutes.",
      "Based on how you’ve felt in the past month.",
      "Your answers will stay private.",
    ],
  },
  "gad-7": {
    description:
      "GAD-7 is a tool used to identify general anxiety disorder symptoms.",
    icon: gadIcon,
    notes: [
      "Takes less than 2 minutes.",
      "There are no right or wrong answers.",
      "Your answers will stay private.",
    ],
  },
};

const StartCard: React.FC<StartCardProps> = ({ type }) => {
  const { description, icon: Icon, notes } = CONTENT[type];

  return (
    <div className="w-[95%] flex flex-col items-center gap-3 p-4">
      <div className="w-full flex flex-col justify-center items-center min-h-[340px] px-4 py-4 bg-third rounded-xl outline outline-1 outline-second ">
        <Icon />
        <div className="text-center">
          <h2 className="m-3 text-font-color text-4xl sm:text-3xl font-bold font-[figtree] leading-tight">
            Check in with <br />
            <span className="text-main">your self</span>
          </h2>
          <p className="text-font-color text-lg sm:text-lg font-bold font-[pretendard] leading-relaxed mt-2">
            {description}
          </p>
        </div>
      </div>
      <ul className="w-full flex flex-col gap-1 text-font-color text-sm sm:text-base font-semibold font-pretendard list-disc list-inside">
        {notes.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default StartCard;
