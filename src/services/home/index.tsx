import { useState } from "react";
import UmAvatar from "../../commons/data-display/Avatar";
import DateChip from "../../commons/data-display/Chip";
import InitChatList from "../../commons/data-display/List/initgroup";
import Card from "../../commons/surfaces/Card";
import ChatToggle from "../../commons/inputs/ToggleButton/chat";

function HomePage() {
  const [selectedOption, setSelectedOption] = useState<"Chat" | "Test">("Chat");

  return (
    <main className="flex flex-col justify-center items-center h-screen pb-44">
      <Card
        onClick={() => {}}
        title="Let's chat with Umi!"
        description="Feel free to share your worries with Umi!"
      />
      <DateChip date={new Date("2025-03-09T16:55:00")} />
      <div className="w-full flex flex-row justify-center gap-2 ml-3">
        <UmAvatar />
        <div className="flex flex-col w-ful">
          <div className="justify-start text-main font-semibold font-['Pretendard']">
            Um
          </div>
          <InitChatList />
          <div className="flex mt-5 gap-2">
            <ChatToggle
              key="Chat"
              selected={selectedOption === "Chat"}
              onClick={() => setSelectedOption("Chat")}
            >
              Chat
            </ChatToggle>
            <ChatToggle
              key="Test"
              selected={selectedOption === "Test"}
              onClick={() => setSelectedOption("Test")}
            >
              Test
            </ChatToggle>
          </div>
        </div>
      </div>
    </main>
  );
}
export default HomePage;
