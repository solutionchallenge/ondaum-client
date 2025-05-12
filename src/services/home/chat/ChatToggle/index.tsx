interface ToggleButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function ChatToggle({
  selected,
  onClick,
  children,
  className,
  disabled,
}: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-3.5 rounded-[20px] text-sm transition-colors duration-300
        ${selected ? "bg-main text-white" : "bg-gray-2 text-gray-5"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}`}
    >
      {children}
    </button>
  );
}

export default ChatToggle;
