import IconModal from "../../../../assets/images/icon_modal.svg?react";
import { archiveChat } from "../../../../api/chat";
import { useChatStore } from "../../../../store/chat";
import { connectChatWebSocket } from "../../../../api/chat/websocket";

// You may want to call an API or update session status here
const handleEndSession = async (onConfirm: () => void) => {
  const sessionId = useChatStore.getState().sessionId;
  if (sessionId) {
    try {
      await archiveChat(sessionId);
      onConfirm();
    } catch (error) {
      console.error("Failed to archive chat:", error);
      // 에러 처리 로직 추가 가능
    }
  } else {
    onConfirm();
  }
};

const handleContinueTalk = async (onClose: () => void) => {
  const sessionId = useChatStore.getState().sessionId;
  if (sessionId) {
    try {
      await connectChatWebSocket((data) => {
        // WebSocket 메시지 핸들러
        console.log("WebSocket message received:", data);
      }, sessionId);
      onClose();
    } catch (error) {
      console.error("Failed to reconnect chat:", error);
      // 에러 처리 로직 추가 가능
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
          <h2 className="text-xl font-bold text-font-color text-center leading-7 font-['Pretendard']">
            Would you like to end
            <br />
            this session?
          </h2>
          <p className="text-sm text-gray-600 text-center leading-tight font-['Pretendard']">
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
            className="w-full h-12 bg-main rounded-[20px] text-white font-semibold text-base font-['Pretendard'] leading-snug"
          >
            End Session
          </button>
          <button
            onClick={() => handleContinueTalk(onClose)}
            className="w-full h-12 bg-gray-1 rounded-[20px] text-gray-700 font-semibold text-base font-['Pretendard'] leading-snug"
          >
            Continue talk
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndSessionModal;
