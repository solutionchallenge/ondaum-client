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
    <div className="w-full h-[51px] bg-gray-2 rounded-[20px] border border-gray-1 flex items-center px-4">
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
        className="flex-1 w-[90%] pr-2 bg-transparent text-font-color2 text-lg font-medium font-pretendard leading-[25.2px] outline-none"
      />
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
        className="w-[34px] h-[34px] bg-main rounded-full flex items-center justify-center"
      >
        <SendIcon />
      </button>
    </div>
  );
}
