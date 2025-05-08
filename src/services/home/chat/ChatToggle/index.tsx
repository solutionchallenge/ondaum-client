interface ToggleButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

function ChatToggle({
  selected,
  onClick,
  children,
  className,
}: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3.5 rounded-[20px] text-sm transition-colors duration-300
        ${selected ? "bg-main text-white" : "bg-gray-2 text-gray-5"}
        ${className}`}
    >
      {children}
    </button>
  );
}

export default ChatToggle;
