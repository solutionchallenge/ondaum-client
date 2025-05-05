
interface ProgressProps {
    stepCount: number;
    currentStepNumber: number;
}

function Progress({stepCount, currentStepNumber}: ProgressProps) {
    const backgroundColor = (count:number)=>{
        if(currentStepNumber > count){
            return 'bg-main'
        } 
        if(currentStepNumber === count){
            return 'bg-third'
        }
        return 'bg-gray-3'
    }

  return (
  <div className={`grid grid-cols-${String(stepCount)}  gap-2`}>
    {Array.from({length: stepCount}).map((_, count)=>(
        <div className={`rounded-md h-2 ${backgroundColor(count+1)}`}></div>
    ))}
  </div>
  );
}

export default Progress;
