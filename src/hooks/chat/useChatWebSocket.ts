import { connectChatWebSocket } from "../../api/chat/websocket";
import { useCallback, useRef } from "react";
import { useChatStore } from "../../store/chat";

export function useChatWebSocket(
  setSessionId: (id: string | null) => void,
  setShowEndSessionModal: (show: boolean) => void,
  setShowSolutionModal: (show: boolean) => void
) {
  const addChatEvent = useChatStore((state) => state.addChatEvent);
  const currentSessionIdRef = useRef<string | null>(null);
  const sessionId = useChatStore((state) => state.sessionId);

  const handleWebSocketMessage = useCallback(
    (data: any) => {
      if (
        data.action === "notify" &&
        (data.payload === "new_conversation" ||
          data.payload === "existing_conversation") &&
        data.session_id
      ) {
        setSessionId(data.session_id);
        if (
          data.payload === "new_conversation" &&
          currentSessionIdRef.current !== data.session_id
        ) {
          connectChatWebSocket(data.session_id);
          currentSessionIdRef.current = data.session_id;
        }
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
        if (data.payload === "") {
          setShowSolutionModal(true);
          addChatEvent({
            action: "data",
            payload:
              "Would you like to talk more about what you’re feeling? You’re not alone.",
            message_id: `um-init-${Date.now()}`,
            session_id: sessionId,
          });
          return;
        }
        try {
          const parsed = JSON.parse(data.payload || "");
          if (parsed.type === "action" && parsed.data === "end_conversation") {
            setShowEndSessionModal(true);
          } else if (
            parsed.type === "action" &&
            parsed.data === "escalate_crisis"
          ) {
            setShowSolutionModal(true);
            addChatEvent({
              action: "data",
              payload:
                "Would you like to talk more about what you’re feeling? You’re not alone.",
              message_id: `um-init-${Date.now()}`,
              session_id: sessionId,
            });
            return;
          }
        } catch (e) {
          console.error("Failed to parse payload", e);
        }
      }
      addChatEvent(data);
    },
    [
      addChatEvent,
      sessionId,
      setSessionId,
      setShowEndSessionModal,
      setShowSolutionModal,
    ]
  );

  return { handleWebSocketMessage };
}
