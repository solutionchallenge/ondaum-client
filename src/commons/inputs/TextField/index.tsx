import SendIcon from "../../../assets/images/icon_send.svg?react";

interface ChatFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

export default function ChatField({ value, onChange, onSend }: ChatFieldProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className="w-full h-[51px] relative">
      {/* Background field */}
      <div className="absolute inset-0 bg-gray-2 rounded-[20px] border border-gray-1" />

      {/* Real input */}
      <input
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter the contents."
        inputMode="text"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        onFocus={() => {
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }, 300);
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[calc(100%-80px)] bg-transparent text-font-color2 text-lg font-medium font-['Pretendard'] leading-[25.2px] outline-none"
      />

      {/* Send button (orange circle) */}
      <button
        type="button"
        onClick={() => {
          onSend();
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }, 300);
        }}
        className="absolute right-2 top-[9px] w-[34px] h-[34px] bg-[#f57c00] rounded-full flex items-center justify-center"
      >
        <SendIcon />
      </button>
    </div>
  );
}
