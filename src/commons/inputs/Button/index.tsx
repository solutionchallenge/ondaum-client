import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function Button({ onClick, children, className, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 rounded-full text-sm font-semibold 
        ${disabled ? "bg-gray-300 text-font-color cursor-not-allowed" : "bg-second text-white"}
        ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
