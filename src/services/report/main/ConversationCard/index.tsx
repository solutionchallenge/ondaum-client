import {  useNavigate } from "react-router-dom";

export default function ConversationCard({id}: {id: string}) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl p-4 shadow-sm border border-third space-y-2 cursor-pointer" onClick={() => {
      navigate(`/report/detail/${id}`);
    }}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-black">Morning Check-in</h2>
          <p className="text-sm text-gray-400">Today, 9:30 AM</p>
        </div>
        <div
          className={`text-sm bg-${"anger"} text-white px-2 py-1 rounded-full`}
        >
          Anger
        </div>
      </div>
      <p className="text-sm text-gray-600 text-ellipsis line-clamp-2">
        Felt frustrated after a tense interaction with my manager this morning
        aslkdfj;askljf;kasjd;fkja;skdfj;kasj;dfksj;a
      </p>
      <div className="flex flex-wrap gap-2">
        {["#overthinking", "#feelinglow", "#selfreflection"].map((tag) => (
          <span
            key={tag}
            className="bg-third text-main text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center pt-1">
        <button className="text-sm text-main">
          View Details
        </button>
      </div>
    </div>
  );
}
