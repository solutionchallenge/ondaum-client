interface CardProps {
  onClick: () => void;
  title?: string;
  description?: string;
}

export default function Card({ onClick, title, description }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="w-full mt-5 max-w-sm px-5 py-4 bg-orange-1 rounded-xl outline outline-1 outline-[#f8a047] flex flex-col gap-2 cursor-pointer"
    >
      <div className="w-full flex flex-col gap-2">
        <div className="text-font-color text-xl font-bold leading-7">
          {title}
        </div>
        <div className="text-font-color text-sm font-normal">{description}</div>
      </div>
    </div>
  );
}
