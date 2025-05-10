import Toggle from "./index.tsx";

interface ToggleGroupProps {
  options: { label: React.ReactNode; value: string }[];
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
          key={option.value}
          selected={selectedOption === option.value}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </Toggle>
      ))}
    </div>
  );
}

export default ToggleGroup;
