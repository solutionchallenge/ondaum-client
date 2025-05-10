import { useState, useEffect, useCallback } from "react";
import { sendWebSocketMessage } from "../../../api/chat/websocket";
import DateChip from "../../../commons/data-display/Chip";

import ChatResultModal from "./ResultSessionModal";
import EndSessionModal from "./EndSessionModal";
import HeaderCard from "./HeaderCard";
import IntroSection from "./IntroSection";
import ChatSection from "./ChatSection";
import TestSection from "./TestSection";
import ChatInputBox from "./ChatInputBox";
import { ChatEvent } from "../../../store/chat";
import { useChatSocket } from "../../../hooks/chat/useChatSocket";

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

  const handleSessionFinished = useCallback(() => {
    setShowEndSessionModal(true);
  }, []);

  const handleMessage = useCallback((event: ChatEvent) => {
    setChatEvents((prev) => {
      if (event.action === "data") {
        try {
          const parsed = JSON.parse(event.payload);
          if (parsed.type === "text") {
            return [
              ...prev,
              {
                action: "data",
                payload: parsed.data,
                session_id: event.session_id,
                message_id: event.message_id,
              },
            ];
          }
        } catch (e) {
          console.error("Invalid payload:", e);
        }
        return prev;
      }
      return [...prev, event];
    });
  }, []);

  useChatSocket({
    enabled: selectedOption === "Chat",
    onSessionFinished: handleSessionFinished,
    onMessage: handleMessage,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
          onSubmit={(text) => {
            sendWebSocketMessage({ action: "chat", payload: text });
            setChatEvents((prev) => [
              ...prev,
              {
                action: "chat",
                payload: text,
                message_id: "",
              },
            ]);
          }}
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
