import { useState } from "react";
import UmAvatar from "../../commons/data-display/Avatar";
import DateChip from "../../commons/data-display/Chip";
import InitChatList from "../../commons/data-display/List/initgroup";
import Card from "../../commons/surfaces/Card";
import ChatToggle from "../../commons/inputs/ToggleButton/chat";
import ChatField from "../../commons/inputs/TextField";
import { UserChatGroup } from "../../commons/data-display/List/usergroup";
import { ChatGroup } from "../../commons/data-display/List/group";
import { useAuthStore } from "../../store/auth";

function HomePage() {
  const { user } = useAuthStore();
  const [selectedOption, setSelectedOption] = useState<"Chat" | "Test" | "">(
    ""
  );
  const [hasselectedOption, hasSetSelectedOption] = useState(false);
  const [isChatFinished, setIsChatFinished] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [userChats, setUserChats] = useState<
    { text: string; bold: boolean }[][]
  >([]);
  const [serverChats, setServerChats] = useState<
    { text: string; bold: boolean }[][]
  >([]);

  return (
    <main className="flex flex-col h-screen overflow-hidden pt-[80px] pb-[120px] bg-white">
      <div className="fixed top-14 left-0 px-4 right-0 z-10 bg-white">
        <Card
          onClick={() => {}}
          title="Let's chat with Umi!"
          description="Feel free to share your worries with Umi!"
        />
      </div>

      {/* 채팅 스크롤 영역 */}
      <div className="flex flex-col w-ful flex-1 overflow-y-auto items-center bg-white">
        <DateChip date={new Date("2025-03-09T16:55:00")} />
        <div className="w-full flex flex-row justify-center gap-2 ml-3">
          <UmAvatar />
          <div className="flex flex-col w-full justify-start">
            <div className="text-main font-semibold font-['Pretendard']">
              Um
            </div>
            <div className="min-h-[200px]">
              <InitChatList onFinish={() => setIsChatFinished(true)} />
              {selectedOption === "Chat" && (
                <>
                  {userChats.map((messages, idx) => (
                    <div
                      key={`chat-${idx}`}
                      className="flex flex-col pr-3 gap-2 w-full"
                    >
                      <div className="text-main flex justify-end w-full pr-3 font-semibold font-['Pretendard']">
                        {user?.name}
                      </div>
                      <div className="flex justify-end w-full pr-3">
                        <UserChatGroup messages={[messages]} />
                      </div>
                      {serverChats[idx] && (
                        <div className="flex justify-start w-full pr-8">
                          <ChatGroup messages={[serverChats[idx]]} />
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            {isChatFinished && hasselectedOption == false && (
              <div className="flex mt-5 gap-2">
                <ChatToggle
                  key="Chat"
                  selected={selectedOption === "Chat"}
                  onClick={() => {
                    setSelectedOption("Chat");
                    hasSetSelectedOption(true);
                  }}
                >
                  Chat
                </ChatToggle>
                <ChatToggle
                  key="Test"
                  selected={selectedOption === "Test"}
                  onClick={() => {
                    setSelectedOption("Test");
                    hasSetSelectedOption(true);
                  }}
                >
                  Test
                </ChatToggle>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-[70px] left-0 w-full px-4 z-10 bg-white">
        <ChatField
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onSend={() => {
            if (chatInput.trim()) {
              const userMessage = [{ text: chatInput.trim(), bold: false }];
              setUserChats((prev) => [...prev, userMessage]);
              setChatInput("");

              // Simulate server reply
              setTimeout(() => {
                const serverReply = [
                  { text: "This is a server reply.", bold: false },
                ];
                setServerChats((prev) => [...prev, serverReply]);
              }, 1000);
            }
          }}
        />
      </div>
    </main>
  );
}

export default HomePage;
