import { useState } from "react";
import UmAvatar from "../../commons/data-display/Avatar";
import DateChip from "../../commons/data-display/Chip";
import InitChatList from "../../commons/data-display/List/initgroup";
import Card from "../../commons/surfaces/Card";
import ChatToggle from "../../commons/inputs/ToggleButton/chat";
import ChatField from "../../commons/inputs/TextField";

function HomePage() {
  const [selectedOption, setSelectedOption] = useState<"Chat" | "Test" | "">(
    ""
  );
  const [hasSelectedOption, setHasSelectedOption] = useState(false);
  const [isChatFinished, setIsChatFinished] = useState(false);
  const [chatInput, setChatInput] = useState("");

  return (
    <main className="flex flex-col h-screen overflow-hidden pb-4 pt-[80px] pb-[120px bg-white">
      <div className="fixed top-14 left-0 px-4 right-0 z-10 bg-white">
        <Card
          onClick={() => {}}
          title="Let's chat with Umi!"
          description="Feel free to share your worries with Umi!"
        />
      </div>
      <div className="flex flex-col w-full flex-1 overflow-y-auto items-center mt-[80px] mb-[160px] bg-white">
        <DateChip date={new Date("2025-03-09T16:55:00")} />
        <div className="w-full flex flex-row justify-center gap-2 ml-3">
          <UmAvatar />
          <div className="flex flex-col w-full justify-start">
            <div className="justify-start text-main font-semibold font-['Pretendard']">
              Um
            </div>
            <div className="min-h-[200px]">
              <InitChatList onFinish={() => setIsChatFinished(true)} />
            </div>
            {isChatFinished && (
              <div className="flex mt-5 gap-2">
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
            )}
            {hasSelectedOption && ""}
          </div>
        </div>
      </div>
      <div className="fixed bottom-[80px] left-0 w-full px-4 z-10 bg-white">
        <ChatField
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onSend={() => {
            console.log(chatInput);
            setChatInput("");
          }}
        />
      </div>
    </main>
  );
}
export default HomePage;
