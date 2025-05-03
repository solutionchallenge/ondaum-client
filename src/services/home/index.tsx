import { useState, useEffect } from "react";
import ChatResultModal from "../../commons/utils/modal/result";
import EndSessionModal from "../../commons/utils/modal";
import UmAvatar from "../../commons/data-display/Avatar";
import DateChip from "../../commons/data-display/Chip";
import InitChatList from "../../commons/data-display/List/initgroup";
import Card from "../../commons/surfaces/Card";
import ChatToggle from "../../commons/inputs/ToggleButton/chat";
import ChatField from "../../commons/inputs/TextField";
import { UserChatGroup } from "../../commons/data-display/List/usergroup";
import { ChatGroup } from "../../commons/data-display/List/group";
import { useAuthStore } from "../../store/auth";

interface ChatEvent {
  sender: "user" | "server";
  text: string;
  bold: boolean;
}

function HomePage() {
  const { user } = useAuthStore();
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

  useEffect(() => {
    if (selectedOption === "Chat") {
      const timer = setTimeout(() => {
        setShowEndSessionModal(true);
      }, 1000); // Currently 1 second for development (later adjust)

      return () => clearTimeout(timer);
    }
  }, [chatEvents, selectedOption]);

  //더미 서버 api 요청
  useEffect(() => {
    if (showChatResultModal) {
      // Simulated API call
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
    <main className="flex flex-col h-screen overflow-hidden pt-[80px] pb-[120px] bg-white">
      <div className="fixed top-14 mt-3 mb-8 left-0 px-4 right-0 z-10 bg-white">
        <Card
          onClick={() => {}}
          title="Let's chat with Umi!"
          description="Feel free to share your worries with Umi!"
        />
      </div>

      {/* 채팅 스크롤 영역 */}
      <div className="flex flex-col w-full flex-1 overflow-y-auto items-center bg-white mt-[50px] mb-[20px]">
        <DateChip date={new Date("2025-03-09T16:55:00")} />
        <div className="w-full flex flex-row justify-center gap-2 ml-3">
          <UmAvatar />
          <div className="flex flex-col w-full justify-start">
            <div className="text-main font-semibold font-['Pretendard']">
              Um
            </div>
            <div className="min-h-[200px] w-full">
              <InitChatList onFinish={() => setIsChatFinished(true)} />
            </div>

            {isChatFinished && hasselectedOption == false && (
              <div className="flex mt-5 gap-2">
                <ChatToggle
                  key="Chat"
                  selected={selectedOption === "Chat"}
                  onClick={() => {
                    setSelectedOption("Chat");
                    hasSetSelectedOption(true);
                    setChatEvents((prev) => [
                      ...prev,
                      {
                        sender: "server",
                        text: "How’s your heart these days?",
                        bold: false,
                      },
                    ]);
                  }}
                >
                  Chat
                </ChatToggle>
                <ChatToggle
                  key="Test"
                  selected={selectedOption === "Test"}
                  onClick={() => {
                    setSelectedOption("Test");
                    hasSetSelectedOption(true);
                  }}
                >
                  Test
                </ChatToggle>
              </div>
            )}
          </div>
        </div>
        {selectedOption === "Chat" && (
          <div className="flex flex-col gap-2 w-full ml-3">
            {chatEvents.map((event, idx) => (
              <div
                key={`event-${idx}`}
                className={`flex w-full ${
                  event.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {event.sender === "server" && (
                  <div className="flex flex-row gap-2 mt-3">
                    <UmAvatar />
                    <div className="flex flex-col">
                      <div className="text-main font-semibold font-['Pretendard']">
                        Um
                      </div>
                      <ChatGroup
                        messages={[[{ text: event.text, bold: event.bold }]]}
                      />
                    </div>
                  </div>
                )}
                {event.sender === "user" && (
                  <div className="flex flex-col items-end gap-2 pr-7">
                    <div className="text-main font-semibold font-['Pretendard'] text-right">
                      {user?.name}
                    </div>
                    <UserChatGroup
                      messages={[[{ text: event.text, bold: event.bold }]]}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-[70px] left-0 w-full px-4 z-10 bg-white">
        <ChatField
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onSend={() => {
            if (chatInput.trim()) {
              setChatEvents((prev) => [
                ...prev,
                { sender: "user", text: chatInput.trim(), bold: false },
              ]);
              setChatInput("");

              setTimeout(() => {
                setChatEvents((prev) => [
                  ...prev,
                  {
                    sender: "server",
                    text: "This is a server reply.",
                    bold: false,
                  },
                ]);
              }, 1000);
            }
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
          onClose={() => setShowChatResultModal(false)}
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
