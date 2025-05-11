import { useState, useEffect, useCallback } from "react";
import DateChip from "../../../commons/data-display/Chip";
import {
  connectChatWebSocket,
  sendWebSocketMessage,
} from "../../../api/chat/websocket";
import { getChatSessionId, Chat } from "../../../api/chat";
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
  const [chatSummary, setChatSummary] = useState<Chat | null>(null);

  const handleWebSocketMessage = useCallback(
    (data: any) => {
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

      if (
        data.action === "notify" &&
        data.payload === "conversation_archived"
      ) {
        setSessionId(null);
      }

      if (
        data.action === "notify" &&
        data.payload === "conversation_finished"
      ) {
        setShowEndSessionModal(true);
      }

      addChatEvent(data);
    },
    [addChatEvent, setSessionId, setSuggestedTest]
  );

  useEffect(() => {
    const setup = async () => {
      const { chats } = await listChats();
      const ongoing = chats.find((c) => !c.is_finished);
      if (ongoing) {
        setSessionId(ongoing.session_id);
        setIsNewSession(false);
      } else {
        setIsNewSession(true);
      }

      connectChatWebSocket(handleWebSocketMessage);
    };

    setup();
  }, [handleWebSocketMessage, setSessionId]);

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
        const full = await getChatSessionId(sessionId);
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

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden mt-16 flex flex-col gap-4 px-4 py-4 mb-8">
        <DateChip date={new Date()} />
        {isNewSession ? <IntroSection /> : <ChatSection />}
        {!isNewSession && showTestSection && (
          <div className="mt-4">
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
          summary={chatSummary.summary}
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
