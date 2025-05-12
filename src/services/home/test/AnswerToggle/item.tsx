import React from "react";
import IconNever from "../../../../assets/images/test/answer/icon_never.svg?react";
import IconNot from "../../../../assets/images/test/answer/icon_not.svg?react";
import IconSeveral from "../../../../assets/images/test/answer/icon_several.svg?react";
import IconMore from "../../../../assets/images/test/answer/icon_more.svg?react";
import IconEvery from "../../../../assets/images/test/answer/icon_every.svg?react";

interface AnswerItemProps {
  title: string;
  selected: boolean;
  order: number;
  onClick?: () => void;
}

const orderIcons = [IconNever, IconNot, IconSeveral, IconMore, IconEvery];

const AnswerItem: React.FC<AnswerItemProps> = ({
  title,
  selected,
  order,
  onClick,
}) => {
  const IconComponent = orderIcons[order] || IconNot;

  return (
    <div
      className={`w-full min-h-[58px] px-5 py-2 rounded-[20px] flex items-center gap-2.5 cursor-pointer ${
        selected ? "bg-second text-white" : "bg-gray-1 text-font-color"
      }`}
      onClick={onClick}
    >
      <div className="flex-shrink-0">
        <IconComponent fill={selected ? "#FAFAFA" : "#E5E7EB"} />
      </div>
      <div className="flex-1">
        <div className="text-lg font-medium leading-tight font-pretendard truncate">
          {title}
        </div>
      </div>
    </div>
  );
};

export default AnswerItem;
