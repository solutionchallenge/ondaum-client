import { useState, useEffect } from "react";
import DateChip from "../../../commons/data-display/Chip";

import ChatResultModal from "./ResultSessionModal";
import EndSessionModal from "./EndSessionModal";
import HeaderCard from "./HeaderCard";
import IntroSection from "./IntroSection";
import ChatSection from "./ChatSection";
import TestSection from "./TestSection";
import ChatInputBox from "./ChatInputBox";
import { ChatEvent } from "../../../store/chat";

function HomePage() {
  const [selectedOption, setSelectedOption] = useState<"Chat" | "Test" | "">(
    ""
  );
  const [hasselectedOption, hasSetSelectedOption] = useState(false);
  const [isChatFinished, setIsChatFinished] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatEvents, setChatEvents] = useState<ChatEvent[]>([]);
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [showChatResultModal, setShowChatResultModal] = useState(false);

  const [summary, setSummary] = useState("");
  const [mood, setMood] = useState("");
  const [themes, setThemes] = useState<string[]>([]);
  const [moodScore, setMoodScore] = useState(0);

  const [selectedTest, setSelectedTest] = useState("phq-9");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (selectedOption === "Chat") {
      const timer = setTimeout(() => {
        setShowEndSessionModal(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [chatEvents, selectedOption]);

  //더미 서버 api 요청
  useEffect(() => {
    if (showChatResultModal) {
      setTimeout(() => {
        setSummary(
          "The consultation revealed signs of moderate anxiety, suggesting a need for continued emotional support and stress management"
        );
        setMood("Fear");
        setThemes(["#overthinking", "#feelinglow", "#selfreflection"]);
        setMoodScore(70);
      }, 500);
    }
  }, [showChatResultModal]);

  return (
    <main className="relative flex flex-col h-screen overflow-hidden bg-white">
      <div className="h-32 flex-shrink-0">
        <HeaderCard />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto mt-16 flex flex-col gap-4 px-4 py-4 mb-8">
        <DateChip date={new Date()} />
        <IntroSection
          isChatFinished={isChatFinished}
          hasselectedOption={hasselectedOption}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setHasSelectedOption={hasSetSelectedOption}
          setChatEvents={setChatEvents}
          setIsChatFinished={setIsChatFinished}
        />
        {selectedOption === "Chat" && <ChatSection chatEvents={chatEvents} />}

        {selectedOption === "Test" && (
          <TestSection
            selectedTest={selectedTest}
            setSelectedTest={setSelectedTest}
            setIsChatFinished={setIsChatFinished}
          />
        )}
      </div>

      <div className="h-[120px] flex-shrink-0">
        <ChatInputBox
          chatInput={chatInput}
          setChatInput={setChatInput}
          setChatEvents={setChatEvents}
        />
      </div>

      {showEndSessionModal && (
        <EndSessionModal
          onClose={() => setShowEndSessionModal(false)}
          onConfirm={() => {
            setShowEndSessionModal(false);
            setShowChatResultModal(true);
          }}
        />
      )}
      {showChatResultModal && (
        <ChatResultModal
          onClose={() => {
            setShowChatResultModal(false);
            setSelectedOption("");
            hasSetSelectedOption(false);
            setIsChatFinished(false);
            setChatInput("");
            setChatEvents([]);
          }}
          summary={summary}
          mood={mood}
          themes={themes}
          moodScore={moodScore}
        />
      )}
    </main>
  );
}

export default HomePage;
