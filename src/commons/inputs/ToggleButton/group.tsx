import Toggle from "./index.tsx";

interface ToggleGroupProps {
  options: { label: React.ReactNode; value: string }[];
  selectedOption: string[] | string;
  onSelect: (option: string[] | string) => void;
  className?: string;
  multiple?: boolean;
}

function ToggleGroup({
  options,
  selectedOption,
  onSelect,
  className,
  multiple=false
}: ToggleGroupProps) {
  
  const selectToggle=(option:{label:React.ReactNode, value:string}) => {
    if(multiple){
      const selectedArray = selectedOption as string[];
      if(selectedArray.includes(option.value)){
        onSelect(selectedArray.filter((item) => item !== option.value));
      }else{
        onSelect([...selectedArray, option.value]);
      }
    }else{
      onSelect(option.value)}
  }
  const isSelected=(option:{label:React.ReactNode, value:string})=>{
    return multiple ? selectedOption.includes(option.value) :selectedOption === option.value
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <Toggle
          key={option.value}
          selected={isSelected(option)}
          onClick={()=>selectToggle(option)}
        >
          {option.label}
        </Toggle>
      ))}
    </div>
  );
}

export default ToggleGroup;
