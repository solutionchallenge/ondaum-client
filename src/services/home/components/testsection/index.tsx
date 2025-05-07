import { useState } from "react";
import UmAvatar from "../../../../commons/data-display/Avatar";
import TestChatList from "../../../../commons/data-display/List/testgroup";
import TestToggle from "../testtoggle";

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
    <div className="w-full flex flex-row gap-2 ml-3">
      <UmAvatar />
      <div className="flex flex-col w-full justify-start">
        <div className="text-main font-semibold font-['Pretendard']">Um</div>
        <TestChatList
          onFinish={() => {
            setIsChatFinished(true);
            setIsListFinished(true);
          }}
        />
        {isListFinished && (
          <div className="overflow-x-auto mt-2 mr-2">
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
