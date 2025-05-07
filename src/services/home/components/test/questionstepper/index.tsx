import IconBack from "../../../../../assets/images/icon_arrow_back.svg?react";

interface QuestionStepperProps {
  currentStep: number; // 1-based index
  totalSteps: number;
  onBack: () => void;
}

const QuestionStepper = ({
  currentStep,
  totalSteps,
  onBack,
}: QuestionStepperProps) => {
  return (
    <div className="w-full bg-white p-3 flex justify-start items-center gap-2">
      <button onClick={onBack}>
        <IconBack className="w-5 h-5" />
      </button>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={`flex-1 h-2 rounded-[20px] ${
            step === currentStep
              ? "bg-third"
              : step < currentStep
                ? "bg-main"
                : "bg-third"
          }`}
        />
      ))}
    </div>
  );
};

export default QuestionStepper;
