import { ReactNode } from "react";

interface CardProps {
  onClick?: () => void;
  icon?: ReactNode;
  title?: string;
  description?: string;
  styleType?:
    | "fill-white/outline-main"
    | "fill-main/outline-main"
    | "fill-third/outline-main"
    | "fill-white/outline-white"
    | "fill-white/outline-third";
  size?: "small" | "middle" | "large";
}

export default function Card({
  icon,
  styleType = "fill-third/outline-main",
  size = "middle",
  onClick,
  title,
  description,
}: CardProps) {
  const styleMap: Record<NonNullable<typeof styleType>, string> = {
    "fill-white/outline-main": "bg-white text-font-color outline-second",
    "fill-main/outline-main": "bg-second text-white outline-second",
    "fill-third/outline-main": "bg-third text-font-color outline-second",
    "fill-white/outline-white": "bg-white text-font-color outline-white",
    "fill-white/outline-third": "bg-white text-font-color outline-third",
  };

  const cardStyle = `${styleMap[styleType ?? "fill-third/outline-main"]} outline outline-1`;

  const sizeStyle = {
    small: "text-xl",
    middle: "text-xl",
    large: "text-2xl",
  };

  return (
    <div
      onClick={() => onClick?.()}
      className={`w-full px-5 py-4 rounded-xl ${cardStyle} flex items-center gap-4 cursor-pointer`}
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
