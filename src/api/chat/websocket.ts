import { http } from "../fetch";

let socket: WebSocket | null = null;

type MessageHandler = (data: any) => void;

let messageHandler: MessageHandler | null = null;

const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const connectWebSocket = (
  baseUrl: string,
  onMessage: MessageHandler
) => {
  const url = new URL(baseUrl);
  // session_id is already included in baseUrl if needed

  socket = new WebSocket(url.toString());
  messageHandler = onMessage;

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      messageHandler?.(data);
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
    socket = null;
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};

export const sendWebSocketMessage = (message: any) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.warn("WebSocket is not open. Message not sent.");
  }
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export const getChatSessionId = async (): Promise<{ session_id: string }> => {
  const { response } = await http.get<{ session_id: string }>(
    "/chat/session-id"
  );
  return response;
};

export const connectChatWebSocket = async (
  onMessage: MessageHandler,
  sessionId?: string
): Promise<void> => {
  const token = getAccessToken();
  if (!token) throw new Error("No access token found");

  const baseUrl = `wss://ondaum.revimal.me/api/v1/_ws/chat`; // 기존 5173에서 실제 WS 서버 포트로 변경
  const url = new URL(baseUrl);
  url.searchParams.set("token", token); // Authorization → token 파라미터로 변경

  if (sessionId) {
    url.searchParams.set("session_id", sessionId);
  }

  connectWebSocket(url.toString(), onMessage);
};

export const pingWebSocket = () => {
  sendWebSocketMessage({ action: "ping", payload: "" });
};
