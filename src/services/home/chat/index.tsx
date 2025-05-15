import { useState, useEffect, useCallback, useRef } from "react";
import { useKeyboardStore } from "../../../store/keyboard";
import { sendWebSocketMessage } from "../../../api/chat/websocket";
import { archiveChat, ChatSummary, putChatSummary } from "../../../api/chat";
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
import UmWithLoading from "../../../assets/lotties/lottie_loading.json";
import Lottie from "react-lottie-player";
import { getDynamicContentHeight } from "../../../hooks/keyboard/useDevice";
import { useDynamicTop } from "../../../hooks/keyboard/useDynamicTop";

function HomePage() {
  const [viewportHeight, setViewportHeight] = useState(
    (window.visualViewport?.height || window.innerHeight) -
      (window.visualViewport?.offsetTop || 0)
  );

  const isKeyboardOpen = useKeyboardStore((state) => state.isKeyboardOpen);
  const dynamicTop = useDynamicTop(isKeyboardOpen);

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
  }, [isKeyboardOpen]);

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
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  const [isNewSession, setIsNewSession] = useState(true);
  const [chatSummary, setChatSummary] = useState<ChatSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const selectedOption = useChatStore((state) => state.selectedOption);

  const location = useLocation();

  useEffect(() => {
    useChatStore.getState().setSelectedOption("");
    useChatStore.getState().setHasSelectedOption(false);
  }, [location.pathname]);

  const { handleWebSocketMessage } = useChatWebSocket(
    setSessionId,
    setShowEndSessionModal,
    setShowSolutionModal
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

  useEffect(() => {
    if (chatSummary) {
      setShowChatResultModal(true);
    }
  }, [chatSummary]);

  return (
    <main
      className="relative flex flex-col bg-white overflow-hidden"
      style={{
        top: `${dynamicTop}px`,
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
          height: getDynamicContentHeight(viewportHeight),
        }}
      >
        <DateChip date={new Date()} />
        {!sessionId && chatEvents.length === 0 && (
          <IntroSectionContainer
            isNewSession={isNewSession}
            selectedOption={selectedOption}
            setShowChatSection={setShowChatSection}
            setShowTestSection={setShowTestSection}
            handleWebSocketMessage={handleWebSocketMessage}
          />
        )}
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
      {isLoadingSummary && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex justify-center items-center">
          <Lottie
            loop
            animationData={UmWithLoading}
            play
            style={{
              width: window.innerWidth < 480 ? "180%" : "100%",
              height: window.innerWidth < 480 ? "auto" : "800px",
            }}
          />
        </div>
      )}
      <ChatModalManager
        showEndSessionModal={showEndSessionModal}
        showChatResultModal={showChatResultModal}
        showSolutionModal={showSolutionModal}
        chatSummary={chatSummary}
        onContinue={handleContinueChat}
        onEnd={() => {
          setShowChatResultModal(false);
          setIsNewSession(true);
          setShowChatSection(true);
          setShowTestSection(false);
        }}
        onArchiveComplete={async () => {
          if (sessionId) {
            try {
              await archiveChat(sessionId);
              setShowEndSessionModal(false);
              setIsLoadingSummary(true);
              const summary = await putChatSummary(sessionId);
              setChatSummary(summary);
              setIsLoadingSummary(false);
              setShowChatResultModal(true);
            } catch (error) {
              setIsLoadingSummary(false);
              console.error("Failed to archive or fetch summary", error);
            }
          }
          setSessionId(null);
          setIsNewSession(true);
          useChatStore.getState().setSelectedOption("");
        }}
        onClose={() => {
          setShowSolutionModal(false);
        }}
      />
    </main>
  );
}

export default HomePage;
