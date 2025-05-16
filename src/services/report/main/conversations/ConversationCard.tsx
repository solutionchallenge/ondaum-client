import { useNavigate } from "react-router-dom";
import { ChatResponse } from "../../../../api/report/chats";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ConversationCard({ item }: { item: ChatResponse }) {
  const navigate = useNavigate();

  const formatTime = (datetime: string) => {
    const day = dayjs(datetime);
    const now = dayjs();

    if (day.isSame(now, "day")) {
      return `Today, ${day.format("h:mm A")}`;
    }
    return day.format("ddd, MMM DD, hh:mm a");
  };

  return (
    <div
      className="rounded-xl p-4 shadow-sm border border-third space-y-2 cursor-pointer"
      onClick={() => {
        navigate(`/report/detail/${item.session_id}`);
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-black">{item?.summary?.title}</h2>
          <p className="text-sm text-gray-400">
            {" "}
            {formatTime(item?.started_date)}
          </p>
        </div>
        <div
          className={`text-sm bg-${item?.summary?.emotions?.[0]?.emotion} text-white px-2 py-1 rounded-full`}
        >
          {item?.summary?.emotions?.[0]?.emotion}
        </div>
      </div>
      <p className="text-sm text-gray-600 text-ellipsis line-clamp-2">
        {item?.summary?.text}
      </p>
      <div className="flex flex-wrap gap-2">
        {item?.summary?.keywords?.map((tag) => (
          <span
            key={tag}
            className="bg-third text-main text-xs px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center pt-1">
        <button className="text-sm text-main">View Details</button>
      </div>
    </div>
  );
}
