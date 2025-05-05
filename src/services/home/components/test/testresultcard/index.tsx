import levelThresholds from "./levelThresholds";
import { levelConfigs } from "./levelConfigs";
import { maxScoreMap } from "./maxScoreMap";

interface TestResultCardProps {
  type: string;
  score: number;
}

const TestResultCard = ({ type, score }: TestResultCardProps) => {
  const thresholds = levelThresholds[type] || [];
  const level = thresholds.reduce(
    (acc, curr) => (score >= curr.min ? curr.level : acc),
    thresholds[0]?.level || "Minimal"
  );
  const { description, Icon } =
    levelConfigs[type]?.[level] || levelConfigs["PHQ-9"]["Minimal"];
  const maxScore = maxScoreMap[type] || 27;
  return (
    <div className="w-full mt-3 mb-24 px-4 py-5 bg-third rounded-xl outline outline-1 outline-offset-[-1px] outline-second flex flex-col items-center gap-4">
      <div className="flex flex-row justify-between items-start w-full gap-4">
        <div className="flex-1 flex flex-col items-start gap-2">
          <div className="text-font-color text-lg sm:text-xl font-bold leading-7">
            Your {type} Score
          </div>
          <div>
            <span className="text-[36px] text-main sm:text-[40px] font-bold leading-tight">
              {score}
            </span>
            <span className="text-font-color text-2xl font-normal">
              {" "}
              / {maxScore}
            </span>
          </div>
        </div>
        <Icon className="w-[80px] sm:w-[103px] h-[80px] sm:h-[94px]" />
      </div>
      <div className="w-full max-w-sm h-10 relative bg-white rounded-full border border-gray-200">
        <div className="absolute inset-0 text-main flex items-center justify-center text-base font-semibold">
          Level: {level}
        </div>
      </div>
      <div className="w-full max-w-sm text-left text-font-color text-base font-semibold">
        {description}
      </div>
    </div>
  );
};

export default TestResultCard;
