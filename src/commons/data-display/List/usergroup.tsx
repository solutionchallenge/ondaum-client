import UserListItem from "./userindex";

interface UserChatGroupProps {
  messages: { text: string; bold: boolean }[][];
}

export function UserChatGroup({ messages }: UserChatGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((contents, idx) => (
        <UserListItem key={idx} contents={contents} />
      ))}
    </div>
  );
}
