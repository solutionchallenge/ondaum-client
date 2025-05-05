import SolutionCard from "./item";
import solutionMap from "./solutionConfigs";
import { resultPolarityMap } from "./solutionLevelMap";

type SolutionGroupProps = {
  type: string;
  result: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  openSolutionModal: () => void;
};

const SolutionGroup = ({
  type,
  result,
  selectedId,
  onSelect,
  openSolutionModal,
}: SolutionGroupProps) => {
  const level = resultPolarityMap[type]?.[result] ?? "positive";
  const items = solutionMap["stress"]?.[level] || [];

  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map(({ id, title, description, icon, onClick }) => {
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
                onClick?.();
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default SolutionGroup;
