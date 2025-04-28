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
        ${selected ? "bg-second text-white" : "bg-gray-1 text-font-color"}
        ${className}`}
    >
      {children}
    </button>
  );
}

export default Toggle;
