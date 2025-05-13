import { useState } from "react";
import UmAvatar from "../../../../commons/data-display/Avatar";
import InitChatList from "../../../../commons/data-display/List/initgroup";
import ChatToggle from "../ChatToggle";
import { useChatStore } from "../../../../store/chat";

const IntroSection = ({ onProceed }: { onProceed: () => void }) => {
  const [isListFinished, setIsListFinished] = useState(false);
  const selectedOption = useChatStore((state) => state.selectedOption);
  const hasSelectedOption = useChatStore((state) => state.hasSelectedOption);
  const setSelectedOption = useChatStore((state) => state.setSelectedOption);
  const setHasSelectedOption = useChatStore(
    (state) => state.setHasSelectedOption
  );

  return (
    <div className="w-full flex flex-row justify-center gap-2 ml-3">
      <UmAvatar />
      <div className="flex flex-col w-full justify-start">
        <div className="text-main font-semibold font-pretendards">Um</div>
        <div className="min-h-[200px] w-full">
          <InitChatList onFinish={() => setIsListFinished(true)} />
        </div>

        <div
          className={`flex mt-5 gap-2 transition-all duration-1000 transform origin-top ${
            isListFinished
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-0 pointer-events-none"
          }`}
        >
          <ChatToggle
            key="Chat"
            selected={selectedOption === "Chat"}
            disabled={hasSelectedOption && selectedOption !== "Chat"}
            onClick={() => {
              setSelectedOption("Chat");
              setHasSelectedOption(true);
              onProceed();
            }}
          >
            Chat
          </ChatToggle>
          <ChatToggle
            key="Test"
            selected={selectedOption === "Test"}
            disabled={hasSelectedOption && selectedOption !== "Test"}
            onClick={() => {
              setSelectedOption("Test");
              setHasSelectedOption(true);
              onProceed();
            }}
          >
            Test
          </ChatToggle>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
