﻿import { useState, useEffect } from "react";
import UmAvatar from "../../../../commons/data-display/Avatar";
import InitChatList from "../../../../commons/data-display/List/initgroup";
import ChatToggle from "../ChatToggle";
import { useChatStore } from "../../../../store/chat";
import { listChats } from "../../../../api/chat";

const IntroSection = ({
  onProceed,
}: {
  onProceed: (option: "Chat" | "Test") => void;
}) => {
  const [isListFinished, setIsListFinished] = useState(false);
  const selectedOption = useChatStore((state) => state.selectedOption);
  const hasSelectedOption = useChatStore((state) => state.hasSelectedOption);
  const setSelectedOption = useChatStore((state) => state.setSelectedOption);
  const setHasSelectedOption = useChatStore(
    (state) => state.setHasSelectedOption
  );
  const sessionId = useChatStore((state) => state.sessionId);
  const addChatEvent = useChatStore((state) => state.addChatEvent);
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      const { chats } = await listChats();
      setIsFirst(chats.length === 0);
    };
    fetchChats();
  }, []);

  return (
    <div className="w-full flex flex-row justify-center gap-2">
      <UmAvatar />
      <div className="flex flex-col w-full justify-start">
        <div className="text-main font-semibold font-pretendards">Um</div>
        <div className="w-full">
          <InitChatList
            onFinish={() => setIsListFinished(true)}
            isFirst={isFirst}
          />
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
              addChatEvent({
                action: "data",
                payload: "How’s your heart these days?",
                message_id: `um-init-${Date.now()}`,
                session_id: sessionId,
              });
              onProceed("Chat");
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
              onProceed("Test");
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
