import ServerItem from "./serveritem";

interface ServerGroupProps {
  messages: { text: string; bold: boolean }[][];
}

export function ChatGroup({ messages }: ServerGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((contents, idx) => (
        <ServerItem key={idx} contents={contents} />
      ))}
    </div>
  );
}
