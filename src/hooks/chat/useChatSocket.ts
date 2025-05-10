// src/hooks/useChatSocket.ts
import { useEffect, useRef } from "react";
import { connectChatWebSocket } from "../../api/chat/websocket";
import { ChatEvent } from "../../store/chat";

type UseChatSocketParams = {
  enabled: boolean;
  onMessage: (event: ChatEvent) => void;
  onSessionFinished?: () => void;
};

export function useChatSocket({
  enabled,
  onMessage,
  onSessionFinished,
}: UseChatSocketParams) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    (async () => {
      if (!enabled) return;

      if (
        socketRef.current &&
        (socketRef.current.readyState === WebSocket.CONNECTING ||
          socketRef.current.readyState === WebSocket.OPEN)
      ) {
        console.warn("WebSocket already connecting or open");
        return;
      }

      let isMounted = true;

      const ws = await connectChatWebSocket((data) => {
        if (!isMounted) return;

        onMessage(data);

        if (data.action === "data") {
          try {
            const parsed = JSON.parse(data.payload);
            if (parsed.type === "text") {
              onMessage({
                action: "data",
                payload: parsed.data,
                session_id: data.session_id,
                message_id: data.message_id,
              });
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

      if (!ws) {
        console.error("WebSocket connection failed.");
        return;
      }

      socketRef.current = ws;

      return () => {
        isMounted = false;
        ws?.close();
        socketRef.current = null;
      };
    })();
  }, [enabled, onSessionFinished, onMessage]);
}
