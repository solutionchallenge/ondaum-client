import UmAvatar from "../../../../commons/data-display/Avatar";
import { ChatGroup } from "../../../../commons/data-display/List/servergroup";
import { UserChatGroup } from "../../../../commons/data-display/List/usergroup";
import { useAuthStore } from "../../../../store/auth";

interface Props {
  chatEvents: { type: "user" | "bot"; content: string; messageId: string }[];
}

const ChatSection = ({ chatEvents }: Props) => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-2 w-full ml-3">
      {chatEvents.map((event, idx) => (
        <div
          key={`event-${idx}`}
          className={`flex w-full ${
            event.type === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {event.type === "bot" && (
            <div className="flex flex-row gap-2 mt-3">
              <UmAvatar />
              <div className="flex flex-col">
                <div className="text-main font-semibold font-['Pretendard']">
                  Um
                </div>
                <ChatGroup
                  messages={[[{ text: event.content, bold: false }]]}
                />
              </div>
            </div>
          )}
          {event.type === "user" && (
            <div className="flex flex-col items-end gap-2 pr-7">
              <div className="text-main font-semibold font-['Pretendard'] text-right">
                {user?.username}
              </div>
              <UserChatGroup
                messages={[[{ text: event.content, bold: false }]]}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatSection;
