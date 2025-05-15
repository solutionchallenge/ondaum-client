import { useState, useEffect, useRef } from "react";
import UmAvatar from "../../../../commons/data-display/Avatar";
import TestChatList from "../../../../commons/data-display/List/testgroup";
import TestToggle from "../TestToggle";
import { useChatStore } from "../../../../store/chat";

const TestSection = () => {
  const [isListFinished, setIsListFinished] = useState(false);
  const selectedTest = useChatStore((state) => state.suggestedTest || "phq-9");
  const setSelectedTest = useChatStore((state) => state.setSuggestedTest);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isListFinished]);

  useEffect(() => {
    setSelectedTest("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-[347px]">
      <div className="flex flex-col w-full justify-start">
        <div className="flex items-start gap-2">
          <UmAvatar />
          <div>
            <div className="text-main font-semibold font-pretendard">Um</div>
            <TestChatList
              onFinish={() => {
                setIsListFinished(true);
              }}
            />
          </div>
        </div>
        {isListFinished && (
          <div className="w-full overflow-x-auto ml-10 pl-2 pr-6 animate-fade-in-up">
            <div className="inline-flex gap-2">
              <TestToggle selected={selectedTest} onSelect={setSelectedTest} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TestSection;
