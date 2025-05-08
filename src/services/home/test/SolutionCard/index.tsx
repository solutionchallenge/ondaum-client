import Card from "../../../../commons/surfaces/Card";
import solutionMap from "./solutionConfigs";
import levelThresholds from "../TestResultCard/levelThresholds";
import { resultPolarityMap } from "./solutionLevelMap";
import { useNavigate } from "react-router-dom";

type SolutionCardProps = {
  type: string;
  score: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  openSolutionModal: () => void;
};

const SolutionCard = ({
  type,
  score,
  selectedId,
  onSelect,
  openSolutionModal,
}: SolutionCardProps) => {
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
        const isModalTarget = id === "stress-negative-1";

        return (
          <Card
            key={id}
            title={title}
            description={description}
            icon={icon}
            styleType={
              selectedId === id
                ? "fill-main/outline-main"
                : "fill-white/outline-white"
            }
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

export default SolutionCard;
