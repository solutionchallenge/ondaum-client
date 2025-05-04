import UmAvatar from "../../../../commons/data-display/Avatar";
import { ChatGroup } from "../../../../commons/data-display/List/servergroup";
import { UserChatGroup } from "../../../../commons/data-display/List/usergroup";
import { useAuthStore } from "../../../../store/auth";

interface Props {
  chatEvents: { sender: "user" | "server"; text: string; bold: boolean }[];
}

const ChatSection = ({ chatEvents }: Props) => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-2 w-full ml-3">
      {chatEvents.map((event, idx) => (
        <div
          key={`event-${idx}`}
          className={`flex w-full ${
            event.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {event.sender === "server" && (
            <div className="flex flex-row gap-2 mt-3">
              <UmAvatar />
              <div className="flex flex-col">
                <div className="text-main font-semibold font-['Pretendard']">
                  Um
                </div>
                <ChatGroup
                  messages={[[{ text: event.text, bold: event.bold }]]}
                />
              </div>
            </div>
          )}
          {event.sender === "user" && (
            <div className="flex flex-col items-end gap-2 pr-7">
              <div className="text-main font-semibold font-['Pretendard'] text-right">
                {user?.name}
              </div>
              <UserChatGroup
                messages={[[{ text: event.text, bold: event.bold }]]}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatSection;
