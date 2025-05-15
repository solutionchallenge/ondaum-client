import Card from "../../../../commons/surfaces/Card";
import { ChatSummary } from "../../../../api/chat";
import { useChatStore } from "../../../../store/chat";
import { EmotionIcon } from "../../../../commons/data-display/EmotionIcon";

const MoodCard = ({ mood, moodScore }: { mood: string; moodScore: number }) => {
  const colorMap: Record<string, string> = {
    joy: "text-joy bg-joy",
    sadness: "text-sadness bg-sadness",
    anger: "text-anger bg-anger",
    fear: "text-fear bg-fear",
    surprise: "text-surprise bg-surprise",
    disgust: "text-disgust bg-disgust",
  };
  return (
    <div className="w-full max-w-sm px-4 py-3 bg-third rounded-[15px] outline outline-1 outline-second flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <EmotionIcon emotion={mood || ""} className="w-4 h-4" />
        <span className="text-black text-sm font-normal leading-tight">
          {mood}
        </span>
      </div>
      <div className="flex items-center gap-2 h-[13px]">
        <div className="relative flex-1 h-[13px] bg-white rounded-full">
          <div
            className={`absolute top-0 left-0 h-full ${colorMap[mood].split(" ")[1]} rounded-full`}
            style={{ width: `${moodScore}%` }}
          />
        </div>
        <div
          className={`${colorMap[mood].split(" ")[0] ?? "text-gray-400"} text-base font-semibold leading-snug`}
        >
          {moodScore}%
        </div>
      </div>
    </div>
  );
};

const ChatResultModal = ({
  summary,
  onClose,
}: {
  summary: ChatSummary;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto py-10 px-6">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-2xl shadow-lg border border-second flex flex-col items-center gap-6">
        <div className="w-full flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-font-color text-center leading-7">
            Here's your <br />
            session summary
          </h2>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="text-main text-sm font-bold leading-tight">
            Conversation Summary
          </div>
          <Card
            onClick={() => {}}
            description={summary?.text ?? "No title available"}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="text-main text-sm font-bold leading-tight">
            Mood of the Day
          </div>
          <MoodCard
            mood={summary?.emotions?.[0]?.emotion ?? "joy"}
            moodScore={
              summary?.emotions?.[0]?.rate != null
                ? Math.round(summary.emotions[0].rate * 100)
                : 0
            }
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="text-main text-sm font-bold leading-tight">
            Key Themes
          </div>
          <div className="flex flex-wrap gap-3">
            {summary?.keywords?.length > 0 &&
              summary.keywords.map((theme) => (
                <div
                  key={theme}
                  className="w-auto h-9 px-4 py-2 bg-third rounded-[15px] outline outline-1 outline-second text-main text-sm"
                >
                  {`#` + theme}
                </div>
              ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="text-center text-font-color2 text-xs font-normal leading-none">
            The conversation history is saved in the report.
          </div>
          <button
            onClick={() => {
              useChatStore.getState().resetChat();
              onClose();
            }}
            className="w-full h-12 bg-main rounded-[20px] text-white font-semibold text-base leading-snug"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatResultModal;
