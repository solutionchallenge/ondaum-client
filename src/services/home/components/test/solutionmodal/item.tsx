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
          <div className="w-2.5 h-2.5 bg-gray-600 rounded-full" />
          <span>{distance}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-2.5 h-2.5 bg-gray-600 rounded-full" />
          <span>{time}</span>
        </div>
      </div>
      <button className="h-[46px] px-5 py-2 rounded-full bg-second text-white text-sm font-pretendard">
        Call now
      </button>
    </div>
  );
};

export default SolutionModalItem;
