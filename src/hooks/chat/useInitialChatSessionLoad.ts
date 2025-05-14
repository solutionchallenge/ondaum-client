import { useEffect, useRef } from "react";
import { useChatStore } from "../../store/chat";
import { listChats } from "../../api/chat";
import { connectChatWebSocket } from "../../api/chat/websocket";

export function useInitialChatSessionLoad(
  handleWebSocketMessage: (data: any) => void,
  setShowChatSection: (show: boolean) => void,
  setIsNewSession: (flag: boolean) => void
) {
  const alreadyInitialized = useRef(false);

  const addChatEvent = useChatStore((state) => state.addChatEvent);
  const chatEvents = useChatStore((state) => state.chatEvents);

  useEffect(() => {
    const setup = async () => {
      const { chats } = await listChats();
      const ongoing = chats.find((c) => !c.is_finished && !c.is_archived);
      if (alreadyInitialized.current) return;
      alreadyInitialized.current = true;

      if (ongoing) {
        setIsNewSession(false);
        if (chatEvents.length === 0) {
          addChatEvent({
            action: "data",
            payload: "How’s your heart these days?",
            message_id: `um-init-${Date.now()}`,
            session_id: ongoing.session_id,
          });
        }
        connectChatWebSocket(handleWebSocketMessage);
        setShowChatSection(true);
      } else {
        setIsNewSession(true);
      }
    };

    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleWebSocketMessage, setShowChatSection, setIsNewSession]);
}
