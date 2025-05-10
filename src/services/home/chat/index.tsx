import { useState, useEffect, useCallback } from "react";
import DateChip from "../../../commons/data-display/Chip";

import ChatResultModal from "./ResultSessionModal";
import EndSessionModal from "./EndSessionModal";
import HeaderCard from "./HeaderCard";
import IntroSection from "./IntroSection";
import ChatSection from "./ChatSection";
import TestSection from "./TestSection";
import ChatInputBox from "./ChatInputBox";
import { useChatConnection } from "../../../hooks/chat/useChatSocket";
import { useChatStore } from "../../../store/chat";

function HomePage() {
  const selectedOption = useChatStore((state) => state.selectedOption);
  const setSelectedOption = useChatStore((state) => state.setSelectedOption);

  const [chatInput, setChatInput] = useState("");

  const sessionId = useChatStore((state) => state.sessionId);
  const suggestedTest = useChatStore((state) => state.suggestedTest);

  // const setConnectionStatus = useChatStore(
  //   (state) => state.setConnectionStatus
  // );
  const setSessionId = useChatStore((state) => state.setSessionId);
  const addChatEvent = useChatStore((state) => state.addChatEvent);
  const clearChatEvents = useChatStore((state) => state.clearChatEvents);

  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [showChatResultModal, setShowChatResultModal] = useState(false);
  const [isNewSession, setIsNewSession] = useState(true);
  //const [shouldReconnect, setShouldReconnect] = useState(false);
  const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);

  // const handleSessionFinished = useCallback(() => {
  //   setShowEndSessionModal(true);
  // }, []);

  // 페이지 마운트 시 바로 WebSocket 연결
  useEffect(() => {
    const initializeChat = () => {
      setSelectedOption("Chat");
      clearChatEvents();
      setSessionId(null);
      setIsNewSession(true);
    };

    initializeChat();
  }, [clearChatEvents, setSessionId, setSelectedOption]);

  const { sendMessage } = useChatConnection(true);

  const handleSendMessage = useCallback(
    (text: string) => {
      const messageId = `user-${Date.now()}`;
      sendMessage(text);
      addChatEvent({
        action: "chat",
        payload: text,
        message_id: messageId,
        session_id: sessionId || "",
      });
    },
    [sendMessage, sessionId, addChatEvent]
  );

  const handleContinueChat = useCallback(() => {
    if (pendingSessionId) {
      setSessionId(pendingSessionId);
      setIsNewSession(false);
      setShouldReconnect(true);
      setPendingSessionId(null);
    }
    setShowEndSessionModal(false);
  }, [pendingSessionId, setSessionId]);

  const handleEndChat = useCallback(() => {
    setShowEndSessionModal(false);
    setShowChatResultModal(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <main className="relative flex flex-col h-screen overflow-hidden bg-white">
      <div className="h-32 flex-shrink-0">
        <HeaderCard />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden mt-16 flex flex-col gap-4 px-4 py-4 mb-8">
        <DateChip date={new Date()} />
        {(isNewSession || selectedOption === "") && <IntroSection />}
        {selectedOption === "Chat" && <ChatSection />}

        {selectedOption === "Test" && suggestedTest !== null && <TestSection />}
      </div>

      <div className="h-[120px] flex-shrink-0">
        <ChatInputBox
          chatInput={chatInput}
          setChatInput={setChatInput}
          setChatEvents={clearChatEvents}
          onSubmit={handleSendMessage}
        />
      </div>

      {showEndSessionModal && (
        <EndSessionModal
          onClose={handleContinueChat}
          onConfirm={handleEndChat}
        />
      )}
      {showChatResultModal && (
        <ChatResultModal
          onClose={() => {
            setShowChatResultModal(false);
            setSelectedOption("");
            setChatInput("");
            clearChatEvents();
            setSessionId(null);
            setIsNewSession(true);
          }}
        />
      )}
    </main>
  );
}

export default HomePage;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setShouldReconnect(_arg0: boolean) {
  throw new Error("Function not implemented.");
}
