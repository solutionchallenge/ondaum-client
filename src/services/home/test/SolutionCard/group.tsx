import SolutionCard from "./item";
import solutionMap from "./solutionConfigs";
import levelThresholds from "../TestResultCard/levelThresholds";
import { resultPolarityMap } from "./solutionLevelMap";
import { useNavigate } from "react-router-dom";

type SolutionGroupProps = {
  type: string;
  score: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  openSolutionModal: () => void;
};

const SolutionGroup = ({
  type,
  score,
  selectedId,
  onSelect,
  openSolutionModal,
}: SolutionGroupProps) => {
  const navigate = useNavigate();
  const thresholds = levelThresholds[type] ?? [];
  const level =
    thresholds
      .slice()
      .reverse()
      .find((t) => score >= t.min)?.level ?? "Minimal";
  const result = resultPolarityMap[type]?.[level] ?? "positive";
  const key = `stress-${result}`;
  const items = solutionMap[key] || [];

  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map(({ id, title, description, icon }) => {
        const isModalTarget = id === "stress-negative-1"; // 필요 조건에 따라 확장 가능

        return (
          <SolutionCard
            key={id}
            title={title}
            description={description}
            icon={icon}
            selected={selectedId === id}
            onClick={() => {
              onSelect(id);
              if (isModalTarget) {
                openSolutionModal();
              } else {
                navigate("/home");
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default SolutionGroup;
