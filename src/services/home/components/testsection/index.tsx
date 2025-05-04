import { useState } from "react";
import UmAvatar from "../../../../commons/data-display/Avatar";
import TestChatList from "../../../../commons/data-display/List/testgroup";
import TestToggle from "../../../../commons/inputs/ToggleButton/test";

interface Props {
  selectedTest: string;
  setSelectedTest: (key: string) => void;
  setIsChatFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestSection = ({
  selectedTest,
  setSelectedTest,
  setIsChatFinished,
}: Props) => {
  const [isListFinished, setIsListFinished] = useState(false);
  return (
    <div className="w-full flex flex-row justify-center gap-2 ml-3">
      <UmAvatar />
      <div className="flex flex-col w-full justify-start">
        <div className="text-main font-semibold font-['Pretendard']">Um</div>
        <div className="overflow-x-auto pr-2">
          <TestChatList
            onFinish={() => {
              setIsChatFinished(true);
              setIsListFinished(true);
            }}
          />
          {isListFinished && (
            <TestToggle selected={selectedTest} onSelect={setSelectedTest} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestSection;
