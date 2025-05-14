import { useCallback } from "react";
import { useChatStore } from "../../store/chat";

export function useChatWebSocket(
  setSessionId: (id: string | null) => void,
  setShowEndSessionModal: (show: boolean) => void
) {
  const addChatEvent = useChatStore((state) => state.addChatEvent);

  const handleWebSocketMessage = useCallback(
    (data: any) => {
      if (
        data.action === "notify" &&
        (data.payload === "new_conversation" ||
          data.payload === "existing_conversation") &&
        data.session_id
      ) {
        setSessionId(data.session_id);
        addChatEvent(data);
        return;
      }
      if (
        data.action === "notify" &&
        data.payload === "conversation_archived"
      ) {
        setSessionId(null);
        addChatEvent(data);
        return;
      }

      if (
        data.action === "notify" &&
        data.payload === "conversation_finished"
      ) {
        setShowEndSessionModal(true);
        addChatEvent(data);
        return;
      }

      if (data.action === "data") {
        try {
          const parsed = JSON.parse(data.payload || "");
          if (parsed.type === "action" && parsed.data === "end_conversation") {
            setShowEndSessionModal(true);
          }
        } catch (e) {
          console.error("Failed to parse payload", e);
        }
      }
      addChatEvent(data);
    },
    [addChatEvent, setSessionId, setShowEndSessionModal]
  );

  return { handleWebSocketMessage };
}
