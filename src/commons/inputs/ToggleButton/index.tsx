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
      className={`px-4 py-3 rounded-2xl text-sm transition-all flex justify-center items-center
        ${selected ? "bg-second text-white" : "bg-gray-1 text-font-color"}
        ${className}`}
    >
      {children}
    </button>
  );
}

export default Toggle;
