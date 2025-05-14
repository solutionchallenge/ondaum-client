import ChatField from "../../../../commons/inputs/TextField";

interface Props {
  chatInput: string;
  setChatInput: (value: string) => void;
  onSubmit: (text: string) => void;
}

const ChatInputBox = ({ chatInput, setChatInput, onSubmit }: Props) => {
  const handleSend = () => {
    const trimmed = chatInput.trim();
    console.log("[handleSend] text:", chatInput, "trimmed:", trimmed);
    if (trimmed) {
      onSubmit(trimmed);
      setChatInput("");
    }
  };

  return (
    <>
      <ChatField
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onSend={handleSend}
      />
    </>
  );
};

export default ChatInputBox;
