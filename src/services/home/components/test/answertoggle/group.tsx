import { useState, useEffect } from "react";
import AnswerItem from "./item";

interface Answer {
  title: string;
}

const defaultAnswers: Answer[] = [
  { title: "Not at all" },
  { title: "Several days" },
  { title: "More than half the days" },
  { title: "Nearly every day" },
];

const pssAnswers: Answer[] = [
  { title: "Never" },
  { title: "Almost Never" },
  { title: "Sometimes" },
  { title: "Fairly Often" },
  { title: "Very Often" },
];

const AnswerGroup: React.FC<{
  onSelect: (score: number) => void;
  questionIndex: number;
  type?: string;
}> = ({ onSelect, questionIndex, type }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const answers = type === "PSS" ? pssAnswers : defaultAnswers;

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
