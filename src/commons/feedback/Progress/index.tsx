interface ProgressProps {
  stepCount: number;
  currentStepNumber: number;
}

function Progress({ stepCount, currentStepNumber }: ProgressProps) {
  const backgroundColor = (count: number) => {
    if (currentStepNumber > count) {
      return "bg-main";
    }
    if (currentStepNumber === count) {
      return "bg-third";
    }
    return "bg-gray-3";
  };
  const gridTemplateColumns = `repeat(${stepCount}, 1fr)`;
  return (
    <div className={`w-full grid gap-2`} style={{ gridTemplateColumns }}>
      {Array.from({ length: stepCount }).map((_, count) => (
        <div
          key={`progress-${count}`}
          className={`rounded-md h-2 ${backgroundColor(count + 1)}`}
        ></div>
      ))}
    </div>
  );
}

export default Progress;
