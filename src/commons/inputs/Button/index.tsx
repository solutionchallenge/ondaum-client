import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  color?: "primary" | "gray";
}

function Button({
  onClick,
  children,
  className,
  disabled,
  color = "primary",
}: ButtonProps) {
  const colorStyle = {
    primary: "bg-main text-white",
    gray: "bg-gray-1 text-font-color",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 rounded-xl text-lg font-semibold ${colorStyle[color]}
        ${disabled && "bg-gray-300 text-font-color cursor-not-allowed"}
        ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
