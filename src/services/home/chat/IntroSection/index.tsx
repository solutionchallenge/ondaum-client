import UmAvatar from "../../../../commons/data-display/Avatar";
import InitChatList from "../../../../commons/data-display/List/initgroup";
import ChatToggle from "../ChatToggle";
import { ChatEvent } from "../../../../store/chat";

interface Props {
  isChatFinished: boolean;
  hasselectedOption: boolean;
  selectedOption: "Chat" | "Test" | "";
  setSelectedOption: (option: "Chat" | "Test") => void;
  setHasSelectedOption: (v: boolean) => void;
  setChatEvents: React.Dispatch<React.SetStateAction<ChatEvent[]>>;
  setIsChatFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const IntroSection = ({
  isChatFinished,
  selectedOption,
  hasselectedOption,
  setSelectedOption,
  setHasSelectedOption,
  setChatEvents,
  setIsChatFinished,
}: Props) => {
  return (
    <div className="w-full flex flex-row justify-center gap-2 ml-3">
      <UmAvatar />
      <div className="flex flex-col w-full justify-start">
        <div className="text-main font-semibold font-['Pretendard']">Um</div>
        <div className="min-h-[200px] w-full">
          <InitChatList onFinish={() => setIsChatFinished(true)} />
        </div>

        {isChatFinished && (
          <div
            className={`flex mt-5 gap-2 transition-all duration-1000 transform origin-top ${
              hasselectedOption
                ? "opacity-0 scale-y-0 h-0 pointer-events-none"
                : "opacity-100 scale-y-100 h-auto"
            }`}
          >
            <ChatToggle
              key="Chat"
              selected={selectedOption === "Chat"}
              onClick={() => {
                setSelectedOption("Chat");
                setHasSelectedOption(true);
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
                setHasSelectedOption(true);
              }}
            >
              Test
            </ChatToggle>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroSection;
