import IconBack from "../../../../assets/images/icon_arrow_back.svg?react";
import Progress from "../../../../commons/feedback/Progress";

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
      <Progress currentStepNumber={currentStep} stepCount={totalSteps} />
    </div>
  );
};

export default QuestionStepper;
