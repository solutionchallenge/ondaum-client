import { JSX } from "react";

interface SolutionCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  icon: JSX.Element;
}

const SolutionCard = ({
  title,
  description,
  selected,
  onClick,
  icon,
}: SolutionCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-full items-center p-4 rounded-xl border shadow-md cursor-pointer transition-colors duration-200 ${
        selected ? "bg-second border-second" : "bg-[#FFFFFF] border-[#FFFFFF]"
      }`}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full shrink-0">
        {icon}
      </div>
      <div className="ml-4 flex flex-col">
        <div
          className={`text-base font-semibold ${selected ? "text-[#FFFFFF]" : "text-font-color"}`}
        >
          {title}
        </div>
        <div
          className={`text-sm ${selected ? "text-[#FFFFFF]" : "text-font-color"}`}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;
