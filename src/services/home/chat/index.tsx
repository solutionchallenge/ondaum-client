import { useState, useEffect, useCallback, useRef } from "react";
import DateChip from "../../../commons/data-display/Chip";
import {
  connectChatWebSocket,
  sendWebSocketMessage,
} from "../../../api/chat/websocket";
import { ChatSummary, getChatSummary } from "../../../api/chat";
import ChatResultModal from "./ResultSessionModal";
import EndSessionModal from "./EndSessionModal";
import HeaderCard from "./HeaderCard";
import IntroSection from "./IntroSection";
import ChatSection from "./ChatSection";
import TestSection from "./TestSection";
import ChatInputBox from "./ChatInputBox";
import { useChatStore } from "../../../store/chat";
import { listChats } from "../../../api/chat";

function HomePage() {
  const alreadyInitialized = useRef(false);
  const [chatInput, setChatInput] = useState("");
  const sessionId = useChatStore((state) => state.sessionId);
  const setSessionId = useChatStore((state) => state.setSessionId);
  const addChatEvent = useChatStore((state) => state.addChatEvent);
  const chatEvents = useChatStore((state) => state.chatEvents);
  const setSuggestedTest = useChatStore((state) => state.setSuggestedTest);
  const [showTestSection, setShowTestSection] = useState(false);

  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [showChatResultModal, setShowChatResultModal] = useState(false);

  const [isNewSession, setIsNewSession] = useState(true);
  const [chatSummary, setChatSummary] = useState<ChatSummary | null>(null);

  const [showChatSection, setShowChatSection] = useState(false);

  const handleWebSocketMessage = useCallback((data: any) => {
    if (data.action === "data") {
      try {
        const parsed = JSON.parse(data.payload);
        if (
          parsed.type === "action" &&
          parsed.data?.startsWith("suggest_test_")
        ) {
          const testType = parsed.data.replace("suggest_test_", "");
          setSuggestedTest(testType);
          setShowTestSection(true);
          return;
        }
      } catch (error) {
        console.error("Error parsing payload:", error);
      }
      addChatEvent(data);
      return;
    }

    if (
      data.action === "notify" &&
      (data.payload === "new_conversation" ||
        data.payload === "existing_conversation") &&
      data.session_id
    ) {
      setSessionId(data.session_id);
      return;
    }

    if (data.action === "notify" && data.payload === "conversation_archived") {
      setSessionId(null);
    }

    if (data.action === "notify" && data.payload === "conversation_finished") {
      setShowEndSessionModal(true);
    }

    addChatEvent(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const setup = async () => {
      const { chats } = await listChats();
      const ongoing = chats.find((c) => !c.is_finished && !c.is_archived);
      if (alreadyInitialized.current) return;
      alreadyInitialized.current = true;
      if (ongoing) {
        setIsNewSession(false);
        addChatEvent({
          action: "data",
          payload: "How’s your heart these days?",
          message_id: `um-init-${Date.now()}`,
          session_id: ongoing.session_id,
        });
        setShowChatSection(true);
      } else {
        setIsNewSession(true);
      }

      connectChatWebSocket(handleWebSocketMessage);
    };

    setup();
  }, [handleWebSocketMessage, setSessionId, addChatEvent]);

  const handleSendMessage = useCallback(
    (text: string) => {
      const messageId = `user-${Date.now()}`;
      sendWebSocketMessage({ action: "chat", payload: text });
      addChatEvent({
        action: "chat",
        payload: text,
        message_id: messageId,
        session_id: sessionId || "",
      });
    },
    [addChatEvent, sessionId]
  );

  const handleContinueChat = useCallback(() => {
    setIsNewSession(false);
    setShowEndSessionModal(false);
  }, []);

  const handleEndChat = useCallback(async () => {
    if (sessionId) {
      try {
        const full = await getChatSummary(sessionId);
        setChatSummary(full);
      } catch (error) {
        console.error("Failed to fetch chat summary", error);
      }
    }
    setShowEndSessionModal(false);
    setShowChatResultModal(true);
  }, [sessionId]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const latestEvent = chatEvents[chatEvents.length - 1];
    if (
      latestEvent?.action === "notify" &&
      latestEvent?.payload === "conversation_finished"
    ) {
      setShowEndSessionModal(true);
    }
  }, [chatEvents]);

  return (
    <main className="relative flex flex-col h-screen overflow-hidden bg-white">
      <div className="h-32 flex-shrink-0">
        <HeaderCard />
      </div>

      <div className="flex-1 w-full min-h-0 overflow-y-auto overflow-x-hidden mt-16 flex flex-col gap-4 px-4 py-4 mb-8">
        <DateChip date={new Date()} />
        {isNewSession && (
          <IntroSection onProceed={() => setShowChatSection(true)} />
        )}
        {(showChatSection || !isNewSession) && <ChatSection />}
        {!showChatSection && showTestSection && (
          <div className="mt-4 z-10">
            <TestSection />
          </div>
        )}
      </div>

      <div className="h-[120px] flex-shrink-0">
        <ChatInputBox
          chatInput={chatInput}
          setChatInput={setChatInput}
          onSubmit={handleSendMessage}
        />
      </div>

      {showEndSessionModal && (
        <EndSessionModal
          onClose={handleContinueChat}
          onConfirm={handleEndChat}
        />
      )}
      {showChatResultModal && chatSummary && (
        <ChatResultModal
          summary={chatSummary}
          onClose={() => {
            setShowChatResultModal(false);
            setSessionId(null);
            setIsNewSession(true);
            setChatSummary(null);
          }}
        />
      )}
    </main>
  );
}

export default HomePage;
