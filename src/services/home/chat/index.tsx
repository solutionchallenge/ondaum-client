import { useState, useEffect, useCallback, useRef } from "react";
import { useKeyboardStore } from "../../../store/keyboard";
import { sendWebSocketMessage } from "../../../api/chat/websocket";
import { archiveChat, ChatSummary, getChatSummary } from "../../../api/chat";
import { useChatStore } from "../../../store/chat";
import { useChatWebSocket } from "../../../hooks/chat/useChatWebSocket";
import { useInitialChatSessionLoad } from "../../../hooks/chat/useInitialChatSessionLoad";
import { useScrollToBottom } from "../../../hooks/chat//useScrollToBottom";
import { useAutoScrollOnInputFocus } from "../../../hooks/chat/useAutoScrollOnInputFocus";
import { useBodyScrollLockWithKeyboard } from "../../../hooks/chat/useBodyScrollLockWithKeyboard";
import {
  ChatHeaderSection,
  ChatInputArea,
  ChatModalManager,
  ChatSectionContainer,
  IntroSectionContainer,
  TestSectionContainer,
} from "./container";
import DateChip from "../../../commons/data-display/Chip";
import { useLocation } from "react-router-dom";

function HomePage() {
  const [viewportHeight, setViewportHeight] = useState(
    (window.visualViewport?.height || window.innerHeight) -
      (window.visualViewport?.offsetTop || 0)
  );
  useEffect(() => {
    const updateHeight = () => {
      const height =
        (window.visualViewport?.height || window.innerHeight) -
        (window.visualViewport?.offsetTop || 0);
      setViewportHeight(height);
    };
    window.visualViewport?.addEventListener("resize", updateHeight);
    updateHeight();
    return () =>
      window.visualViewport?.removeEventListener("resize", updateHeight);
  }, []);

  const isKeyboardOpen = useKeyboardStore((state) => state.isKeyboardOpen);

  const bottomRef = useRef<HTMLDivElement>(null);
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

  const location = useLocation();

  useEffect(() => {
    useChatStore.getState().setSelectedOption("");
    useChatStore.getState().setHasSelectedOption(false);
  }, [location.pathname]);

  const { handleWebSocketMessage } = useChatWebSocket(
    setSessionId,
    setShowEndSessionModal
  );
  useInitialChatSessionLoad(
    handleWebSocketMessage,
    setShowChatSection,
    setIsNewSession
  );
  useScrollToBottom(bottomRef, [chatEvents]);
  useAutoScrollOnInputFocus();
  useBodyScrollLockWithKeyboard();

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
    const latestEvent = chatEvents[chatEvents.length - 1];
    if (
      latestEvent?.action === "notify" &&
      latestEvent?.payload === "conversation_finished"
    ) {
      setShowEndSessionModal(true);
    }
  }, [chatEvents]);

  return (
    <main
      className="relative flex flex-col bg-white overflow-hidden"
      style={{
        top: isKeyboardOpen ? "224px" : "0px",
        height: `${viewportHeight}px`,
      }}
    >
      <div className="sticky top-0 z-10 bg-white">
        <ChatHeaderSection />
      </div>
      <div
        className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col gap-4 px-4"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "none",
          paddingBottom: isKeyboardOpen ? "0px" : "123px",
          height: `${viewportHeight - 59}px`,
        }}
      >
        <DateChip date={new Date()} />
        <IntroSectionContainer
          isNewSession={isNewSession}
          selectedOption={selectedOption}
          setShowChatSection={setShowChatSection}
          setShowTestSection={setShowTestSection}
          handleWebSocketMessage={handleWebSocketMessage}
        />
        <ChatSectionContainer showChatSection={showChatSection} />
        <TestSectionContainer showTestSection={showTestSection} />
        <div ref={bottomRef} />
      </div>
      <ChatInputArea
        chatInput={chatInput}
        setChatInput={setChatInput}
        onSubmit={handleSendMessage}
        isKeyboardOpen={isKeyboardOpen}
      />
      <ChatModalManager
        showEndSessionModal={showEndSessionModal}
        showChatResultModal={showChatResultModal}
        chatSummary={chatSummary}
        onContinue={handleContinueChat}
        onEnd={handleEndChat}
        onArchiveComplete={async () => {
          if (sessionId) {
            await archiveChat(sessionId);
            console.log("Chat archived successfully");
          }
          setShowChatResultModal(false);
          setSessionId(null);
          setIsNewSession(true);
          setChatSummary(null);
          useChatStore.getState().setSelectedOption("");
        }}
      />
    </main>
  );
}

export default HomePage;
