import type { ChatEvent } from "../../store/chat";
import { useChatStore } from "../../store/chat";

type MessageHandler = (data: any) => void;

let initialSocket: WebSocket | null = null;
let sessionSocket: WebSocket | null = null;
let pingInterval: ReturnType<typeof setInterval> | null = null;
let connectionAttempted = false;

const messageQueue: string[] = [];
let messageHandler: MessageHandler | null = null;

const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

const startPingInterval = () => {
  if (pingInterval) clearInterval(pingInterval);

  let retryCount = 0;

  pingInterval = setInterval(() => {
    if (
      sessionSocket &&
      sessionSocket.readyState === WebSocket.OPEN &&
      sessionSocket.url.startsWith("wss://ondaum.revimal.me")
    ) {
      sessionSocket.send(JSON.stringify({ action: "ping", payload: "" }));
      console.log("✅ Ping sent to session WebSocket:", sessionSocket.url);
      retryCount = 0;
    } else {
      retryCount++;
      console.warn("❌ Ping failed or invalid socket URL:", sessionSocket?.url);
      if (retryCount >= 5) {
        console.warn("❌ Ping aborted: retry limit exceeded");
        clearInterval(pingInterval!);
        pingInterval = null;
      }
    }
  }, 30000);
};

export const connectChatWebSocket = (
  onMessage: (data: any) => void
): WebSocket | null => {
  if (connectionAttempted) {
    console.warn("WebSocket connection previously attempted. Skipping retry.");
    return null;
  }
  const token = getAccessToken();
  if (!token) throw new Error("No access token found");

  if (
    initialSocket &&
    (initialSocket.readyState === WebSocket.CONNECTING ||
      initialSocket.readyState === WebSocket.OPEN)
  ) {
    console.warn(
      "WebSocket already connecting or open. Skipping new connection."
    );
    return initialSocket;
  }

  if (initialSocket) {
    initialSocket.close();
    initialSocket = null;
  }
  if (sessionSocket) {
    sessionSocket.close();
    sessionSocket = null;
  }
  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
  }

  const url = new URL("wss://ondaum.revimal.me/api/v1/_ws/chat");
  url.searchParams.set("access_token", token);

  const newSocket = new WebSocket(url.toString());
  if (newSocket.url.includes("localhost:5173")) {
    console.warn("❌ Prevented accidental connection to Vite HMR WebSocket");
    return null;
  }
  initialSocket = newSocket;
  messageHandler = onMessage;

  newSocket.onopen = () => {
    connectionAttempted = true;
    console.log("Initial WebSocket connected");
  };

  newSocket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.session_id) {
        const sessionId = data.session_id;
        console.log("Received session_id:", sessionId);
        useChatStore.getState().setSessionId(sessionId);

        if (initialSocket) {
          initialSocket.close();
          initialSocket = null;
        }

        const sessionUrl = new URL(`wss://ondaum.revimal.me/api/v1/_ws/chat`);
        sessionUrl.searchParams.set("session_id", sessionId);
        sessionUrl.searchParams.set("access_token", token);

        const sessionWS = new WebSocket(sessionUrl.toString());
        messageHandler = onMessage;
        sessionWS.onopen = () => {
          console.log("Session WebSocket connected");
          sessionSocket = sessionWS;
          startPingInterval();
        };

        sessionWS.onmessage = (e) => {
          try {
            const msg = JSON.parse(e.data);
            messageHandler?.(msg);
          } catch (err) {
            console.error("Error parsing session WS message:", err);
          }
        };

        sessionWS.onclose = () => {
          if (sessionSocket === sessionWS) {
            sessionSocket = null;
          }
          if (pingInterval) {
            clearInterval(pingInterval);
            pingInterval = null;
          }
          console.log("Session WebSocket disconnected");
        };

        sessionWS.onerror = (err) => {
          console.error("Session WebSocket error:", err);
        };
      } else {
        messageHandler?.(data);
      }
    } catch (e) {
      console.error("Error parsing WebSocket message:", e);
    }
  };

  newSocket.onclose = () => {
    connectionAttempted = false;
    if (initialSocket === newSocket) {
      initialSocket = null;
    }
    console.log("Initial WebSocket disconnected");
  };

  newSocket.onerror = (error) => {
    connectionAttempted = false;
    console.error("Initial WebSocket error:", error);
  };

  return newSocket;
};

export const sendWebSocketMessage = (message: Partial<ChatEvent>) => {
  const msg = JSON.stringify(message);
  console.log("[WebSocket][SEND]", sessionSocket?.readyState, message);

  if (sessionSocket && sessionSocket.readyState === WebSocket.OPEN) {
    sessionSocket.send(msg);
  } else if (
    sessionSocket &&
    sessionSocket.readyState === WebSocket.CONNECTING
  ) {
    console.log("[WebSocket][QUEUE_PUSH]", msg);
    messageQueue.push(msg);
  } else {
    console.warn("WebSocket is not open. Message not sent.");
  }
};

export const closeWebSocket = () => {
  if (initialSocket) {
    initialSocket.close();
    initialSocket = null;
  }
  if (sessionSocket) {
    sessionSocket.close();
    sessionSocket = null;
  }
  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
  }
};
