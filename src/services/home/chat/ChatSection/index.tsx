import { useEffect, useRef } from "react";
import UmAvatar from "../../../../commons/data-display/Avatar";
import { ChatGroup } from "../../../../commons/data-display/List/servergroup";
import { UserChatGroup } from "../../../../commons/data-display/List/usergroup";
import { useAuthStore } from "../../../../store/auth";
import { useChatStore } from "../../../../store/chat";
import TestSection from "../TestSection";

const getDisplayText = (payload: string) => {
  try {
    const parsed = JSON.parse(payload);
    if (parsed && typeof parsed === "object" && "data" in parsed) {
      return parsed.data;
    }
    return payload;
  } catch {
    return payload;
  }
};

const ChatSection = () => {
  const { user } = useAuthStore();
  const { chatEvents } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatEvents]);

  return (
    <>
      {chatEvents.map((event, idx) => {
        const isUser = event.action === "chat";
        const isBot = event.action === "data";

        if (
          event.action === "data" &&
          typeof event.payload === "string" &&
          event.payload.startsWith("{")
        ) {
          const parsed = JSON.parse(event.payload);
          if (
            parsed.type === "action" &&
            parsed.data?.startsWith("suggest_test_")
          ) {
            return (
              <div key={`event-${idx}`} className="flex flex-col gap-4 w-full">
                <div className="z-10">
                  <TestSection />
                  <div ref={messagesEndRef} />
                </div>
              </div>
            );
          }
        }

        return (
          <div key={`event-${idx}`} className="flex flex-col gap-4 w-full">
            <div
              className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
            >
              {isBot && (
                <div className="flex flex-row gap-2 max-w-[90%]">
                  <UmAvatar />
                  <div className="flex flex-col">
                    <div className="text-main font-semibold font-pretendard">
                      Um
                    </div>
                    <ChatGroup
                      messages={[
                        [{ text: getDisplayText(event.payload), bold: false }],
                      ]}
                    />
                  </div>
                </div>
              )}
              {isUser && (
                <div className="flex flex-col items-end gap-2 max-w-[90%]">
                  <div className="text-main font-semibold font-pretendard">
                    {user?.username}
                  </div>
                  <UserChatGroup
                    messages={[
                      [{ text: getDisplayText(event.payload), bold: false }],
                    ]}
                  />
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>
        );
      })}
    </>
  );
};

export default ChatSection;
