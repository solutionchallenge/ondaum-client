import Card from "../../../../commons/surfaces/Card";
import AngerIcon from "../../../../assets/images/chatresult/icon_anger.svg?react";
import DisgustIcon from "../../../../assets/images/chatresult/icon_disgust.svg?react";
import SadnessIcon from "../../../../assets/images/chatresult/icon_sadness.svg?react";
import FearIcon from "../../../../assets/images/chatresult/icon_fear.svg?react";
import SurpriseIcon from "../../../../assets/images/chatresult/icon_surprise.svg?react";
import HappinessIcon from "../../../../assets/images/chatresult/icon_happiness.svg?react";
import { JSX } from "react";
import { useChatStore } from "../../../../store/chat";

const MoodCard = ({ mood, moodScore }: { mood: string; moodScore: number }) => {
  const moodStyles: Record<string, { icon: JSX.Element; color: string }> = {
    Anger: {
      icon: <AngerIcon className="w-5 h-5" />,
      color: "bg-anger text-anger",
    },
    Disgust: {
      icon: <DisgustIcon className="w-5 h-5" />,
      color: "bg-disgust text-disgust",
    },
    Sadness: {
      icon: <SadnessIcon className="w-5 h-5" />,
      color: "bg-sadness text-sadness",
    },
    Fear: {
      icon: <FearIcon className="w-5 h-5" />,
      color: "bg-fear text-fear",
    },
    Surprise: {
      icon: <SurpriseIcon className="w-5 h-5" />,
      color: "bg-surprise text-surprise",
    },
    Happiness: {
      icon: <HappinessIcon className="w-5 h-5" />,
      color: "bg-happiness text-happiness",
    },
  };

  const currentStyle = moodStyles[mood] || {
    icon: null,
    color: "bg-gray-300 text-gray-500",
  };

  return (
    <div className="w-full max-w-sm px-4 py-3 bg-third rounded-[15px] outline outline-1 outline-main flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div>{currentStyle.icon}</div>
        <span className="text-black text-sm font-normal leading-tight">
          {mood}
        </span>
      </div>
      <div className="flex items-center gap-2 h-[13px]">
        <div className="relative flex-1 h-[13px] bg-white rounded-full border border-gray-200">
          <div
            className={`absolute top-0 left-0 h-full ${currentStyle.color.split(" ")[0]} rounded-full border border-gray-200`}
            style={{ width: `${moodScore}%` }}
          />
        </div>
        <div
          className={`${currentStyle.color.split(" ")[1]} text-base font-semibold leading-snug`}
        >
          {moodScore}%
        </div>
      </div>
    </div>
  );
};

const ChatResultModal = ({ onClose }: { onClose: () => void }) => {
  const summary = useChatStore((state) => state.summary);
  const mood = useChatStore((state) => state.mood);
  const themes = useChatStore((state) => state.themes);
  const moodScore = useChatStore((state) => state.moodScore);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[90%] max-w-md px-6 py-8 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center gap-6">
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
          <Card onClick={() => {}} description={summary} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="text-main text-sm font-bold leading-tight">
            Mood of the Day
          </div>
          <MoodCard mood={mood} moodScore={moodScore} />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="text-main text-sm font-bold leading-tight">
            Key Themes
          </div>
          <div className="flex flex-wrap gap-3">
            {themes.map((theme) => (
              <div className="w-auto h-9 px-4 py-2 bg-third rounded-[15px] outline outline-1 outline-main text-main text-sm">
                {theme}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="text-center text-font-color2 text-xs font-normal leading-none">
            The conversation history is saved in the report.
          </div>
          <button
            onClick={onClose}
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
