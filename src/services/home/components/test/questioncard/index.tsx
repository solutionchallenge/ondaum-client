import React from "react";

interface QuestionCardProps {
  questionText: string | React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const QuestionCard = ({
  questionText,
}: QuestionCardProps) => {
  return (
    <div className="w-full px-4 py-5 bg-white flex flex-col gap-6 sm:gap-3">
      <div className="text-font-color text-xl sm:text-2xl md:text-[28px] font-semibold leading-snug">
        {questionText}
      </div>
    </div>
  );
};

export default QuestionCard;
