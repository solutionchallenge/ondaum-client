interface StepperProps {
  currentStep: number; // 1-based index
}

const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="w-full p-3 flex justify-start items-center gap-2">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`flex-1 h-2.5 rounded-[20px] ${
            step === currentStep
              ? "bg-third"
              : step < currentStep
                ? "bg-main"
                : "bg-[#d9d9d9]"
          }`}
        />
      ))}
    </div>
  );
};

export default Stepper;
