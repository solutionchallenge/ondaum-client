import IconModal from "../../../../assets/images/icon_modal.svg?react";
import { useChatStore } from "../../../../store/chat";
import { connectChatWebSocket } from "../../../../api/chat/websocket";

const handleEndSession = async (onConfirm: () => void) => {
  console.log("handleEndSession triggered");
  const sessionId = useChatStore.getState().sessionId;
  console.log("Current sessionId:", sessionId);

  if (sessionId) {
    try {
      onConfirm();
    } catch (error) {
      console.error("Failed to archive chat:", error);
    }
  } else {
    console.warn("No sessionId found, calling onConfirm directly");
    onConfirm();
  }
};

const handleContinueTalk = async (onClose: () => void) => {
  const sessionId = useChatStore.getState().sessionId;
  if (sessionId) {
    try {
      await connectChatWebSocket((data) => {
        console.log("WebSocket message received:", data);
      });
      onClose();
    } catch (error) {
      console.error("Failed to reconnect chat:", error);
    }
  } else {
    onClose();
  }
};

const EndSessionModal = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[90%] max-w-md px-6 py-8 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center gap-6">
        <IconModal className="w-26 h-auto" />
        <div className="w-full flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-font-color text-center leading-7 font-pretendard">
            Would you like to end
            <br />
            this session?
          </h2>
          <p className="text-sm text-gray-600 text-center leading-tight font-pretendard">
            Thank you for opening up.
            <br />
            We're here whenever
            <br />
            you're ready to return.
          </p>
        </div>
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => handleEndSession(onConfirm)}
            className="w-full h-12 bg-main rounded-[20px] text-white font-semibold text-base font-pretendard leading-snug"
          >
            End Session
          </button>
          <button
            onClick={() => handleContinueTalk(onClose)}
            className="w-full h-12 bg-gray-1 rounded-[20px] text-gray-700 font-semibold text-base font-pretendard leading-snug"
          >
            Continue talk
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndSessionModal;
