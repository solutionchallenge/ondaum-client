import { useState } from "react";
import UmAvatar from "../../../../commons/data-display/Avatar";
import TestChatList from "../../../../commons/data-display/List/testgroup";
import TestToggle from "../TestToggle";
import { useChatStore } from "../../../../store/chat";

const TestSection = () => {
  const [isListFinished, setIsListFinished] = useState(false);
  const selectedTest = useChatStore((state) => state.suggestedTest || "phq-9");
  const setSelectedTest = useChatStore((state) => state.setSuggestedTest);

  return (
    <div className="w-full flex flex-row gap-2 mb-4">
      <UmAvatar />
      <div className="flex flex-col w-full justify-start">
        <div className="text-main font-semibold font-pretendard">Um</div>
        <TestChatList
          onFinish={() => {
            setIsListFinished(true);
          }}
        />
        {isListFinished && (
          <div className="overflow-x-auto mt-2 mr-10">
            <div className="flex flex-nowrap gap-2 w-max max-w-[347px]">
              <TestToggle selected={selectedTest} onSelect={setSelectedTest} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSection;
