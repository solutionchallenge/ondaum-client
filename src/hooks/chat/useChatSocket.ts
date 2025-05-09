// src/hooks/useChatSocket.ts
import { useEffect } from "react";
import { connectChatWebSocket, pingWebSocket } from "../../api/chat/websocket";
import { ChatEvent } from "../../store/chat";

type UseChatSocketParams = {
  enabled: boolean;
  setChatEvents: React.Dispatch<React.SetStateAction<ChatEvent[]>>;
  onSessionFinished?: () => void;
};

export function useChatSocket({
  enabled,
  setChatEvents,
  onSessionFinished,
}: UseChatSocketParams) {
  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;

    connectChatWebSocket((data) => {
      if (!isMounted) return;

      if (data.action === "data") {
        try {
          const parsed = JSON.parse(data.payload);
          if (parsed.type === "text") {
            setChatEvents((prev) => [
              ...prev,
              {
                type: "bot",
                content: parsed.data,
                messageId: data.message_id,
              },
            ]);
          }
        } catch (err) {
          console.error("Invalid payload", err);
        }
      } else if (
        data.action === "notify" &&
        data.payload === "conversation_finished"
      ) {
        onSessionFinished?.();
      }
    });

    const interval = setInterval(() => {
      pingWebSocket();
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [enabled, onSessionFinished, setChatEvents]);
}
