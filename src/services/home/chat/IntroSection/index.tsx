import { useState } from "react";
import UmAvatar from "../../../../commons/data-display/Avatar";
import InitChatList from "../../../../commons/data-display/List/initgroup";
import ChatToggle from "../ChatToggle";
import { useChatStore } from "../../../../store/chat";

const IntroSection = () => {
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
        <div className="text-main font-semibold font-['Pretendard']">Um</div>
        <div className="min-h-[200px] w-full">
          <InitChatList onFinish={() => setIsListFinished(true)} />
        </div>

        <div
          className={`flex mt-5 gap-2 transition-all duration-1000 transform origin-top ${
            isListFinished && !hasSelectedOption
              ? "opacity-100 scale-y-100 h-auto"
              : "opacity-0 scale-y-0 h-0 pointer-events-none"
          }`}
        >
          <ChatToggle
            key="Chat"
            selected={selectedOption === "Chat"}
            onClick={() => {
              setSelectedOption("Chat");
              setHasSelectedOption(true);
            }}
          >
            Chat
          </ChatToggle>
          <ChatToggle
            key="Test"
            selected={selectedOption === "Test"}
            onClick={() => {
              setSelectedOption("Test");
              setHasSelectedOption(true);
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
