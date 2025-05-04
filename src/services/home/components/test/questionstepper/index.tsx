interface QuestionStepperProps {
  currentStep: number; // 1-based index
  totalSteps: number;
}

const QuestionStepper = ({ currentStep, totalSteps }: QuestionStepperProps) => {
  return (
    <div className="w-full p-3 flex justify-start items-center gap-2">
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
