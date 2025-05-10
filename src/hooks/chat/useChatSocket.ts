import { useEffect, useRef } from "react";
import {
  connectChatWebSocket,
  sendWebSocketMessage,
} from "../../api/chat/websocket";
import { useChatStore } from "../../store/chat";

export function useChatConnection(enabled: boolean) {
  const socketRef = useRef<WebSocket | null>(null);
  const {
    addChatEvent,
    clearChatEvents,
    setSessionId,
    setConnectionStatus,
    setSuggestedTest,
  } = useChatStore();

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;

    const setupWebSocket = async () => {
      if (
        socketRef.current &&
        (socketRef.current.readyState === WebSocket.CONNECTING ||
          socketRef.current.readyState === WebSocket.OPEN)
      ) {
        console.warn("WebSocket already connecting or open");
        return;
      }

      const ws = await connectChatWebSocket((data) => {
        if (!isMounted) return;

        addChatEvent(data);

        if (data.action === "data") {
          try {
            const parsed = JSON.parse(data.payload);
            if (parsed.type === "text") {
              addChatEvent({
                action: "data",
                payload: parsed.data,
                session_id: data.session_id,
                message_id: data.message_id,
              });
            } else if (
              parsed.type === "action" &&
              parsed.data.startsWith("suggest_test_")
            ) {
              const testType = parsed.data.replace("suggest_test_", "");
              setSuggestedTest(testType);
            }
          } catch (err) {
            console.error("Invalid payload", err);
          }
        } else if (data.action === "notify") {
          switch (data.payload) {
            case "new_conversation":
            case "existing_conversation":
              if (data.session_id) {
                setSessionId(data.session_id);
              }
              break;
            case "conversation_archived":
              setSessionId(null);
              clearChatEvents();
              break;
            case "conversation_finished":
              setSessionId(null);
              break;
          }
        }
      });

      if (!ws) {
        console.error("WebSocket connection failed.");
        return;
      }

      socketRef.current = ws;
      setConnectionStatus(true);
    };

    setupWebSocket();

    return () => {
      isMounted = false;
      socketRef.current?.close();
      socketRef.current = null;
      setConnectionStatus(false);
    };
  }, [enabled]);

  const sendMessage = (payload: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      sendWebSocketMessage({ action: "chat", payload });
    } else {
      console.warn("Cannot send message: WebSocket is not open.");
    }
  };

  return {
    sendMessage,
  };
}
