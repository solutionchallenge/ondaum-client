import { useState } from "react";
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

const AnswerGroup: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {answers.map((answer, idx) => (
        <AnswerItem
          key={idx}
          title={answer.title}
          order={idx}
          selected={selectedIndex === idx}
          onClick={() => setSelectedIndex(idx)}
        />
      ))}
    </div>
  );
};

export { AnswerGroup };
