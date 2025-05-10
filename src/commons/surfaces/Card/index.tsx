import { ReactNode } from "react";

interface CardProps {
  onClick?: () => void;
  icon?: ReactNode;
  title?: string;
  description?: string;
  styleType?:
    | "filled_primary"
    | "outlined_primary"
    | "filled_third"
    | "outlined_third"
    | "filled_white"
    | "outlined_white";
  size?: "small" | "middle" | "large";
}

export default function Card({
  icon,
  styleType = "outlined_third",
  size = "middle",
  onClick,
  title,
  description,
}: CardProps) {
  const [style, color] = styleType.split("_") as [
    "filled" | "outlined",
    "primary" | "third" | "white",
  ];

  const colorStyle = {
    primary: "bg-second text-white",
    third: "bg-third text-font-color",
    white: "bg-[#ffffff] text-font-color",
  };
  const contentStyle = {
    filled: "",
    outlined: "outline-second outline outline-1 ",
  };

  const sizeStyle = {
    small: "text-xl",
    middle: "text-xl",
    large: "text-2xl",
  };

  return (
    <div
      onClick={() => onClick?.()}
      className={`w-full px-5 py-4 rounded-xl ${colorStyle[color]} ${contentStyle[style]} flex items-center gap-4 ${onClick && 'cursor-pointer'}`}
    >
      {icon && icon}
      <div className="w-full flex flex-col gap-2">
        <div
          className={`font-bold leading-7 whitespace-pre-line ${sizeStyle[size]}`}
        >
          {title}
        </div>
        <div className="text-sm font-normal whitespace-pre-line">
          {description}
        </div>
      </div>
    </div>
  );
}
