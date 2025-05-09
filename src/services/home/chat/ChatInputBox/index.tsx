import ChatField from "../../../../commons/inputs/TextField";

export interface ChatEvent {
  type: "user" | "bot";
  content: string;
  messageId: string;
}

interface Props {
  chatInput: string;
  setChatInput: (value: string) => void;
  setChatEvents: React.Dispatch<React.SetStateAction<ChatEvent[]>>;
  onSubmit: (text: string) => void;
}

const ChatInputBox = ({ chatInput, setChatInput, onSubmit }: Props) => {
  const handleSend = () => {
    const trimmed = chatInput.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setChatInput("");
    }
  };

  return (
    <div className="fixed bottom-[70px] left-0 w-full px-4 z-10 bg-white">
      <ChatField
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatInputBox;
