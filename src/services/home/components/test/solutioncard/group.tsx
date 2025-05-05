import SolutionCard from "./item";
import solutionMap from "./solutionConfigs";
import { resultPolarityMap } from "./solutionLevelMap";

type SolutionGroupProps = {
  type: string;
  result: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const SolutionGroup = ({
  type,
  result,
  selectedId,
  onSelect,
}: SolutionGroupProps) => {
  const level = resultPolarityMap[type]?.[result] ?? "positive";
  const items = solutionMap["stress"]?.[level] || [];

  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map(({ id, title, description, icon, onClick }) => (
        <SolutionCard
          key={id}
          title={title}
          description={description}
          icon={icon}
          selected={selectedId === id}
          onClick={() => {
            onSelect(id);
            onClick();
          }}
        />
      ))}
    </div>
  );
};

export default SolutionGroup;
