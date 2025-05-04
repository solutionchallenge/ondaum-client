import React from "react";

interface TestToggleItem {
  key: string;
  title: string;
  description: string;
}

interface TestToggleGroupProps {
  selected: string;
  onSelect: (key: string) => void;
}

const TEST_TOGGLE_ITEMS: TestToggleItem[] = [
  { key: "phq-9", title: "PHQ-9", description: "symptoms of depression." },
  { key: "gad-7", title: "GAD-7", description: "Measures anxiety levels." },
  { key: "pss", title: "PSS", description: "Evaluates perceived stress" },
];

const TestToggle: React.FC<TestToggleGroupProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 w-full mt-4">
      {TEST_TOGGLE_ITEMS.map((item) => {
        const isSelected = selected === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`flex flex-col w-[30%] min-w-[100px] h-36 justify-between px-3 py-4 rounded-[15px] outline outline-1 flex-grow transition-colors
              ${isSelected ? "bg-main text-white outline-main" : "bg-[#ededed] text-font-color outline-gray-2"}`}
          >
            <div className="text-base font-semibold leading-snug text-left">
              {item.title}
            </div>
            <div className="text-xs font-normal leading-none text-left">
              {item.description}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default TestToggle;
