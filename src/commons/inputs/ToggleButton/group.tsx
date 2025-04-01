import Toggle from "./index.tsx";

interface ToggleGroupProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
  className?: string;
}

function ToggleGroup({
  options,
  selectedOption,
  onSelect,
  className,
}: ToggleGroupProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <Toggle
          key={option}
          selected={selectedOption === option}
          onClick={() => onSelect(option)}
        >
          {option}
        </Toggle>
      ))}
    </div>
  );
}

export default ToggleGroup;
