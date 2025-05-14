import { useState } from "react";
import Card from "../../../../commons/surfaces/Card";
import AngerPersonIcon from "../../../../assets/images/icon_person_anger.svg?react";
import QuestionMarkIcon from "../../../../assets/images/icon_questionmark.svg?react";
import MeditationModal from "./MeditationModal";

function Recommendations() {
  const [meditationModal, setMeditationModal] = useState({
    title: "",
    description: "",
    posterImage: "",
    minutes: 0,
    videoSrc: "",
    content: "",
    isVisible: false,
  });

  return (
    <section className="flex flex-col gap-4 mt-4 mb-4">
      <h1 className="font-semibold">Recommendations</h1>
      <Card
        icon={<QuestionMarkIcon />}
        title="When anxiety is high"
        description={`Try 10 minutes of daily meditation`}
        styleType="fill-main/outline-main"
        size="large"
        onClick={() => {
          setMeditationModal({
            title: "5-Minute Meditation",
            minutes: 5,
            posterImage: "/videos/image_meta1.png",
            videoSrc: "/videos/video_1.mp4",
            description:
              "Practice mindful meditation when feeling anxious. Find a quiet space, sit comfortably, and focus on your breath.",
            content: `Anxiety Relief`,
            isVisible: true,
          });
        }}
      />
      <Card
        icon={<AngerPersonIcon />}
        title="When anger builds up"
        description={`Release through physical exercise`}
        styleType="fill-main/outline-main"
        size="large"
        onClick={() => {
          setMeditationModal({
            title: "Quick Movement Reset",
            minutes: 10,
            posterImage: "/videos/image_meta2.png",
            videoSrc: "/videos/video_2.mp4",
            description:
              "Release built-up anger through mindful movement. Step away from the stress, do light stretches, shake out tension.",
            content: `Anger Management`,
            isVisible: true,
          });
        }}
      />
      <MeditationModal
        item={meditationModal}
        updateItem={(item) => setMeditationModal(item)}
      />
    </section>
  );
}
export default Recommendations;
