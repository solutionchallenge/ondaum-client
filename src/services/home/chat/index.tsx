import { useState, useEffect, useCallback, useRef } from "react";
import { useKeyboardStore } from "../../../store/keyboard";
import DateChip from "../../../commons/data-display/Chip";
import {
  connectChatWebSocket,
  sendWebSocketMessage,
} from "../../../api/chat/websocket";
import { archiveChat, ChatSummary, getChatSummary } from "../../../api/chat";
import ChatResultModal from "./ResultSessionModal";
import EndSessionModal from "./EndSessionModal";
import HeaderCard from "./HeaderCard";
import IntroSection from "./IntroSection";
import ChatSection from "./ChatSection";
import ChatInputBox from "./ChatInputBox";
import { useChatStore } from "../../../store/chat";
import { listChats } from "../../../api/chat";
import TestSection from "./TestSection";

function HomePage() {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  const isKeyboardOpen = useKeyboardStore((state) => state.isKeyboardOpen);

  const bottomRef = useRef<HTMLDivElement>(null);
  const alreadyInitialized = useRef(false);
  const [chatInput, setChatInput] = useState("");
  const sessionId = useChatStore((state) => state.sessionId);
  const setSessionId = useChatStore((state) => state.setSessionId);
  const addChatEvent = useChatStore((state) => state.addChatEvent);
  const chatEvents = useChatStore((state) => state.chatEvents);

  const [showChatSection, setShowChatSection] = useState(false);
  const [showTestSection, setShowTestSection] = useState(false);
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [showChatResultModal, setShowChatResultModal] = useState(false);

  const [isNewSession, setIsNewSession] = useState(true);
  const [chatSummary, setChatSummary] = useState<ChatSummary | null>(null);
  const selectedOption = useChatStore((state) => state.selectedOption);

  const handleWebSocketMessage = useCallback((data: any) => {
    if (data.action === "data") {
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
        if (chatEvents.length === 0) {
          addChatEvent({
            action: "data",
            payload: "How’s your heart these days?",
            message_id: `um-init-${Date.now()}`,
            session_id: ongoing.session_id,
          });
        }
        setShowChatSection(true);
      } else {
        setIsNewSession(true);
      }
      // connectChatWebSocket(handleWebSocketMessage);
    };

    setup();
  }, [handleWebSocketMessage, setSessionId, addChatEvent, chatEvents.length]);

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
    const handleResize = () => {
      document.body.style.overflow =
        window.innerHeight < window.outerHeight ? "auto" : "hidden";
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  useEffect(() => {
    const inputEl = document.querySelector("input");

    if (!inputEl) return;
    const handleFocus = () => {
      setTimeout(() => {
        inputEl.scrollIntoView({ block: "end", behavior: "smooth" });
      }, 100);
    };

    inputEl.addEventListener("focus", handleFocus);
    return () => {
      inputEl.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <main
      className="relative flex flex-col bg-white overflow-hidden"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div className="sticky top-0 w-full gap-4 px-4 py-4">
        <HeaderCard />
      </div>
      <div
        className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col gap-4 px-4 py-4 mb-12"
        style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "none" }}
      >
        <DateChip date={new Date()} />
        {isNewSession && (
          <IntroSection
            onProceed={() => {
              if (selectedOption === "Chat") {
                setShowChatSection(true);
                connectChatWebSocket(handleWebSocketMessage);
              } else if (selectedOption === "Test") {
                setShowTestSection(true);
              }
            }}
          />
        )}
        {showChatSection && <ChatSection />}
        {showTestSection && <TestSection />}
        <div ref={bottomRef} />
      </div>

      <div
        className="z-10 bg-white px-4 pt-2"
        style={{
          position: isKeyboardOpen ? "absolute" : "sticky",
          bottom: isKeyboardOpen ? "0" : undefined,
          width: "100%",
          paddingBottom: isKeyboardOpen
            ? "env(safe-area-inset-bottom)"
            : "2.5rem",
        }}
      >
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
          onClose={async () => {
            if (sessionId) {
              await archiveChat(sessionId);
              console.log("Chat archived successfully");
            }
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
