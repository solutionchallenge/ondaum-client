import Modal from "../../../../commons/feedback/Modal";
import TimerIcon from "../../../../assets/images/icon_timer.svg?react";
import PlayIcon from "../../../../assets/images/icon_play.svg?react";
import TagIcon from "../../../../assets/images/icon_tag.svg?react";
import { useEffect } from "react";

declare global {
  interface Document {
    webkitFullscreenElement: Element | null;
    mozFullScreenElement: Element | null;
    msFullscreenElement: Element | null;
  }
}

export type MediationModalItem = {
  title: string;
  videoSrc: string;
  description: string;
  minutes: number;
  content: string;
  isVisible: boolean;
};

interface MeditationModalProps {
  item: MediationModalItem;
  updateItem: (item: MediationModalItem) => void;
}

function MeditationModal({ item, updateItem }: MeditationModalProps) {
  const startPlay = () => {
    const elem = document.getElementById("video") as HTMLVideoElement | null;
    if (elem) {
      elem.play();
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).mozRequestFullScreen) {
        (elem as any).mozRequestFullScreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen();
      }
    }
  };

  const handleFullScreenChange = () => {
    const video = document.getElementById("video") as HTMLVideoElement | null;
    if (
      video &&
      !document?.fullscreenElement &&
      !document?.webkitFullscreenElement &&
      !document?.mozFullScreenElement &&
      !document?.msFullscreenElement
    ) {
      video.pause();
      video.currentTime = 0;
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange
      );
    };
  }, []);

  return (
    <Modal
      isOpen={item.isVisible}
      onClose={() => {
        updateItem({ ...item, isVisible: false });
      }}
    >
      <>
        <video
          id="video"
          className="w-full h-full rounded-lg"
          src={item.videoSrc}
        />
        <h2 className="text-2xl font-bold text-font-color mb-1 mt-3">
          {item.title}
        </h2>
        <div className="flex items-center text-sm font-semibold text-[#525252] mt-3 mb-6">
          <TimerIcon className="mr-2" />
          {item.minutes} minutes
        </div>
        <p className="text-sm text-gray-700 mb-5">{item.description}</p>
        <div className="flex items-center font-semibold text-gray-700 mb-3">
          <TagIcon className="mr-2" />
          {item.content}
        </div>
        <button
          className="flex items-center justify-center w-full py-3 rounded-lg bg-orange-400 text-white font-semibold"
          onClick={startPlay}
        >
          <PlayIcon className="mr-2" />
          Start Meditation
        </button>
      </>
    </Modal>
  );
}

export default MeditationModal;
