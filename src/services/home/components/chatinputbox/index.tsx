import ChatField from "../../../../commons/inputs/TextField";

interface ChatEvent {
  sender: "user" | "server";
  text: string;
  bold: boolean;
}

interface Props {
  chatInput: string;
  setChatInput: (value: string) => void;
  setChatEvents: React.Dispatch<React.SetStateAction<ChatEvent[]>>;
}

const ChatInputBox = ({ chatInput, setChatInput, setChatEvents }: Props) => {
  const handleSend = () => {
    if (chatInput.trim()) {
      setChatEvents((prev) => [
        ...prev,
        { sender: "user", text: chatInput.trim(), bold: false },
      ]);
      setChatInput("");

      setTimeout(() => {
        setChatEvents((prev) => [
          ...prev,
          {
            sender: "server",
            text: "This is a server reply.",
            bold: false,
          },
        ]);
      }, 1000);
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
