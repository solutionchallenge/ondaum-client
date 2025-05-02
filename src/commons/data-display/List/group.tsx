import ListItem from "./index";

interface ChatGroupProps {
  messages: { text: string; bold: boolean }[][];
}

export function ChatGroup({ messages }: ChatGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((contents, idx) => (
        <ListItem key={idx} contents={contents} />
      ))}
    </div>
  );
}
