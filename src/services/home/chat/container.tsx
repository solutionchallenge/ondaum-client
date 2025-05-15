import ChatSection from "./ChatSection";
import IntroSection from "./IntroSection";
import TestSection from "./TestSection";
import { connectChatWebSocket } from "../../../api/chat/websocket";
import ChatInputBox from "./ChatInputBox";
import { ChatSummary } from "../../../api/chat";
import EndSessionModal from "./EndSessionModal";
import ChatResultModal from "./ResultSessionModal";
import HeaderCard from "./HeaderCard";
import { useChatStore } from "../../../store/chat";
import SolutionModal from "../test/SolutionModal";

export const IntroSectionContainer = ({
  isNewSession,
  setShowChatSection,
  setShowTestSection,
  handleWebSocketMessage,
}: {
  isNewSession: boolean;
  selectedOption: string | null;
  setShowChatSection: (value: boolean) => void;
  setShowTestSection: (value: boolean) => void;
  handleWebSocketMessage: (data: any) => void;
}) => {
  if (!isNewSession) return null;
  return (
    <IntroSection
      onProceed={(option) => {
        const { setSelectedOption } = useChatStore.getState();
        setSelectedOption(option);

        if (option === "Chat") {
          setShowChatSection(true);
          setShowTestSection(false);
          connectChatWebSocket(handleWebSocketMessage);
        } else if (option === "Test") {
          setShowTestSection(true);
          setShowChatSection(false);
        } else {
          setShowChatSection(false);
          setShowTestSection(false);
          setSelectedOption("");
        }
      }}
    />
  );
};

export const ChatSectionContainer = ({
  showChatSection,
}: {
  showChatSection: boolean;
}) => {
  if (!showChatSection) return null;
  return <ChatSection />;
};

export const TestSectionContainer = ({
  showTestSection,
}: {
  showTestSection: boolean;
}) => {
  if (!showTestSection) return null;
  return <TestSection />;
};

export const ChatInputArea = ({
  chatInput,
  setChatInput,
  onSubmit,
  isKeyboardOpen,
}: {
  chatInput: string;
  setChatInput: (value: string) => void;
  onSubmit: (text: string) => void;
  isKeyboardOpen: boolean;
}) => (
  <div
    className="z-10 bg-white px-3 pt-2"
    style={{
      position: "fixed",
      bottom: isKeyboardOpen ? "10px" : "64px",
      width: "100%",
      zIndex: 20,
      transition: "bottom 0.3s ease",
    }}
  >
    <ChatInputBox
      chatInput={chatInput}
      setChatInput={setChatInput}
      onSubmit={onSubmit}
    />
  </div>
);

export const ChatModalManager = ({
  showEndSessionModal,
  showChatResultModal,
  showSolutionModal,
  chatSummary,
  onContinue,
  onEnd,
  onArchiveComplete,
  onClose,
}: {
  showEndSessionModal: boolean;
  showChatResultModal: boolean;
  showSolutionModal: boolean;
  chatSummary: ChatSummary | null;
  onContinue: () => void;
  onEnd: () => void;
  onArchiveComplete: () => void;
  onClose: () => void;
}) => (
  <>
    {showEndSessionModal && (
      <EndSessionModal onClose={onContinue} onConfirm={onArchiveComplete} />
    )}
    {showChatResultModal && chatSummary && (
      <ChatResultModal summary={chatSummary} onClose={onEnd} />
    )}
    {showSolutionModal && <SolutionModal onClose={onClose} />}
  </>
);

export const ChatHeaderSection = () => (
  <div className="flex flex-col sticky top-0 w-full gap-5 px-4 py-3 mb-5">
    <HeaderCard />
  </div>
);
