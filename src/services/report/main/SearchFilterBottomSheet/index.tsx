import BottomSheet from "../../../../commons/feedback/BottomSheet";
import Button from "../../../../commons/inputs/Button";
import ToggleGroup from "../../../../commons/inputs/ToggleButton/group";
import { useState } from "react";

export default function SearchFilterBottomSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState("1 day ago");
  return (
    <BottomSheet
      isOpen={isOpen}
      title="Selection Conditions"
      onClose={onClose}
      footer={
        <div className="w-full grid grid-cols-2 gap-2">
          <Button onClick={onClose} color="gray">
            cancel
          </Button>
          <Button onClick={() => {}} color="primary">
            check
          </Button>
        </div>
      }
    >
      <section>
        <h3 className="font-semibold text-font-color">
          Emotions
          <span className="font-base block text-sm text-second">
            Just pick one
          </span>
        </h3>
        <div>
          <ToggleGroup
            options={["1 day ago", "3 days ago", "1 week ago", "1 month ago"]}
            selectedOption={selectedDate}
            onSelect={(option) => {
              setSelectedDate(option);
            }}
          />
        </div>

        <h3 className="font-semibold text-font-color">
          Query Period
          <span className="font-base block text-sm text-second">
            Multiple selections available
          </span>
        </h3>
        <div></div>
      </section>
    </BottomSheet>
  );
}
