import IconWalk from "../../../../assets/images/test/solution/icon_walk.svg?react";
import IconTime from "../../../../assets/images/test/solution/icon_time.svg?react";

interface SolutionModalItemProps {
  title: string;
  distance: string;
  time: string;
}

const SolutionModalItem = ({
  title,
  distance,
  time,
}: SolutionModalItemProps) => {
  return (
    <div className="flex flex-row w-full items-center justify-between gap-3 p-4 rounded-2xl bg-gray-1">
      <div className="flex flex-col gap-2 text-sm text-gray-800 font-pretendard">
        <div className="font-medium">{title}</div>
        <div className="flex items-center gap-2 text-gray-600">
          <IconWalk className="w-4 h-4" />
          <span>{distance}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <IconTime className="w-4 h-4" />
          <span>{time}</span>
        </div>
      </div>
      <button
        className="w-[89px] h-[46px] py-2 rounded-full bg-second text-white text-sm font-pretendard"
        onClick={() => {
          window.location.href = "tel:" + 109977384123123;
        }}
      >
        Call now
      </button>
    </div>
  );
};

export default SolutionModalItem;
