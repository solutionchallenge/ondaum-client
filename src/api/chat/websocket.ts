import type { ChatEvent } from "../../store/chat";

let socket: WebSocket | null = null;

const messageQueue: string[] = [];

type MessageHandler = (data: any) => void;

let messageHandler: MessageHandler | null = null;

const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const connectWebSocket = (
  baseUrl: string,
  onMessage: MessageHandler
): WebSocket | null => {
  if (socket) {
    socket.close();
    socket = null;
  }

  const url = new URL(baseUrl);
  // session_id is already included in baseUrl if needed

  const newSocket = new WebSocket(url.toString());
  messageHandler = onMessage;

  newSocket.onopen = () => {
    socket = newSocket;
    console.log("WebSocket connected");
    console.log("[WebSocket][QUEUE_FLUSH]", messageQueue.length);
    while (messageQueue.length > 0) {
      const msg = messageQueue.shift();
      if (msg) socket?.send(msg);
    }
  };

  newSocket.onmessage = (event) => {
    if (socket !== newSocket) return;
    try {
      const data = JSON.parse(event.data);
      messageHandler?.(data);
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  newSocket.onclose = () => {
    if (socket === newSocket) {
      socket = null;
    }
    console.log("WebSocket disconnected");
  };

  newSocket.onerror = (error) => {
    if (socket !== newSocket) return;
    console.error("WebSocket error:", error);
  };

  return newSocket;
};

export const sendWebSocketMessage = (message: Partial<ChatEvent>) => {
  const msg = JSON.stringify(message);
  console.log("[WebSocket][SEND]", socket?.readyState, message);

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(msg);
  } else if (socket && socket.readyState === WebSocket.CONNECTING) {
    console.log("[WebSocket][QUEUE_PUSH]", msg);
    messageQueue.push(msg);
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

export const connectChatWebSocket = async (
  onMessage: MessageHandler,
  sessionId?: string
): Promise<WebSocket | null> => {
  const token = getAccessToken();
  if (!token) throw new Error("No access token found");

  const baseUrl = `wss://ondaum.revimal.me/api/v1/_ws/chat`;
  const url = new URL(baseUrl);

  if (sessionId) {
    url.searchParams.set("session_id", sessionId);
  }

  url.searchParams.set("access_token", token);

  return connectWebSocket(url.toString(), onMessage);
};

export const pingWebSocket = () => {
  sendWebSocketMessage({
    action: "ping",
    payload: "",
  });
};
