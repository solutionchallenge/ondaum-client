import BottomSheet from "../../../../commons/feedback/BottomSheet";
import Button from "../../../../commons/inputs/Button";
import ToggleGroup from "../../../../commons/inputs/ToggleButton/group";
import { useState } from "react";
import JoyIcon from "../../../../assets/images/chatresult/icon_joy.svg?react";
import SadnessIcon from "../../../../assets/images/chatresult/icon_sadness.svg?react";
import AngerIcon from "../../../../assets/images/chatresult/icon_anger.svg?react";
import SurpriseIcon from "../../../../assets/images/chatresult/icon_surprise.svg?react";
import FearIcon from "../../../../assets/images/chatresult/icon_fear.svg?react";
import DisgustIcon from "../../../../assets/images/chatresult/icon_disgust.svg?react";

export const EmotionOptions = [
  { label: <JoyIcon color="#FFD900" />, value: "joy" },
  { label: <AngerIcon color="#274B7A" />, value: "anger" },
  { label: <SurpriseIcon color="#CFC5B4" />, value: "surprise" },
  { label: <SadnessIcon color="#4A90E2" />, value: "sadness" },
  { label: <FearIcon color="#5C6BC0" />, value: "fear" },
  { label: <DisgustIcon color="#8E837E" />, value: "disgust" },
];
export default function SearchFilterBottomSheet({
  item,
  updateItem,
}: {
  item: {
    isVisible: boolean;
    filter: {
      date: string;
      emotion: string[];
    };
  };
  updateItem: (item: {
    isVisible: boolean;
    filter: {
      date: string;
      emotion: string[];
    };
  }) => void;
}) {
  const [selectedDate, setSelectedDate] = useState(item.filter.date);
  const [selectedEmotion, setSelectedEmotion] = useState(item.filter.emotion);

  return (
    <BottomSheet
      isOpen={item.isVisible}
      title="Selection Conditions"
      onClose={() => {
        updateItem({ ...item, isVisible: false });
      }}
      footer={
        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            onClick={() => {
              updateItem({ ...item, isVisible: false });
            }}
            color="gray"
          >
            cancel
          </Button>
          <Button
            onClick={() => {
              updateItem({
                isVisible: false,
                filter: {
                  date: selectedDate,
                  emotion: selectedEmotion,
                },
              });
            }}
            color="primary"
          >
            check
          </Button>
        </div>
      }
    >
      <section>
        <h3 className="font-semibold text-font-color mb-4">
          Emotions
          <span className="font-base block text-sm text-second">
            Just pick one
          </span>
        </h3>
        <div className="mb-6">
          <ToggleGroup
            options={[
              { label: "1 day ago", value: "1" },
              { label: "3 days ago", value: "3" },
              { label: "1 week ago", value: "7" },
              { label: "1 month ago", value: "31" },
            ]}
            selectedOption={selectedDate}
            onSelect={(option) => {
              setSelectedDate(option as string);
            }}
          />
        </div>

        <h3 className="font-semibold text-font-color mb-4">
          Query Period
          <span className="font-base block text-sm text-second">
            Multiple selections available
          </span>
        </h3>
        <div className="mb-6">
          <ToggleGroup
            className="grid grid-cols-3 justify-center items-center"
            multiple
            options={EmotionOptions}
            selectedOption={selectedEmotion}
            onSelect={(option) => {
              setSelectedEmotion(option as string[]);
            }}
          />
        </div>
      </section>
    </BottomSheet>
  );
}
