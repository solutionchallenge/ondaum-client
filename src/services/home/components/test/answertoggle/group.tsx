import { useState, useEffect } from "react";
import AnswerItem from "./item";

interface Answer {
  title: string;
}

const answers: Answer[] = [
  { title: "Not at all" },
  { title: "Several days" },
  { title: "More than half the days" },
  { title: "Nearly every day" },
];

const AnswerGroup: React.FC<{
  onSelect: (score: number) => void;
  questionIndex: number;
}> = ({ onSelect, questionIndex }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [questionIndex]);

  return (
    <div className="flex flex-col w-full px-3 gap-3">
      {answers.map((answer, idx) => (
        <AnswerItem
          key={idx}
          title={answer.title}
          order={idx}
          selected={selectedIndex === idx}
          onClick={() => {
            setSelectedIndex(idx);
            onSelect(idx);
          }}
        />
      ))}
    </div>
  );
};

export { AnswerGroup };
