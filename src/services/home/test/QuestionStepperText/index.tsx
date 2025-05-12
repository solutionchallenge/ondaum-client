interface QuestionStepperProps {
  currentStep: number; // 1-based index
  totalSteps: number;
}

const QuestionStepperText = ({
  currentStep,
  totalSteps,
}: QuestionStepperProps) => {
  return (
    <div className="inline-flex items-end gap-1 sm:gap-2 px-4 py-3 pb-3">
      <div className="text-second text-2xl sm:text-3xl md:text-4xl font-semibold leading-none">
        {String(currentStep).padStart(2, "0")}
      </div>
      <div className="text-font-color2 text-lg sm:text-xl md:text-2xl font-normal leading-none">
        / {String(totalSteps).padStart(2, "0")}
      </div>
    </div>
  );
};

export default QuestionStepperText;
