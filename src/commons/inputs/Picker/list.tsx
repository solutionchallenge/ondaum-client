import PickerButton from "./index.tsx";

interface PickerListProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
  className?: string;
}

function PickerList({
  options,
  selectedOption,
  onSelect,
  className,
}: PickerListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <PickerButton
          key={option}
          selected={selectedOption === option}
          onClick={() => onSelect(option)}
        >
          {option}
        </PickerButton>
      ))}
    </div>
  );
}

export default PickerList;
