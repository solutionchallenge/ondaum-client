interface ToggleButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

function Toggle({ selected, onClick, children, className }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition-all
        ${selected ? "bg-orange-2 text-white" : "bg-gray-2 text-gray-5"}
        ${className}`}
    >
      {children}
    </button>
  );
}

export default Toggle;
