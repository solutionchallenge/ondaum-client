import { useState, useEffect, useCallback, useRef } from "react";
import DateChip from "../../../commons/data-display/Chip";

import {
  connectChatWebSocket,
  sendWebSocketMessage,
} from "../../../api/chat/websocket";

import ChatResultModal from "./ResultSessionModal";
import EndSessionModal from "./EndSessionModal";
import HeaderCard from "./HeaderCard";
import IntroSection from "./IntroSection";
import ChatSection from "./ChatSection";
import TestSection from "./TestSection";
import ChatInputBox from "./ChatInputBox";
import { useChatStore } from "../../../store/chat";
import { listChats } from "../../../api/chat";

function HomePage() {
  const selectedOption = useChatStore((state) => state.selectedOption);
  const setSelectedOption = useChatStore((state) => state.setSelectedOption);

  const [chatInput, setChatInput] = useState("");

  const sessionId = useChatStore((state) => state.sessionId);
  const setSessionId = useChatStore((state) => state.setSessionId);
  const addChatEvent = useChatStore((state) => state.addChatEvent);
  const chatEvents = useChatStore((state) => state.chatEvents);

  const suggestedTest = useChatStore((state) => state.suggestedTest);

  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [showChatResultModal, setShowChatResultModal] = useState(false);
  const [isNewSession, setIsNewSession] = useState(true);

  // Ref to persist the latest sessionId for websocket reconnection logic
  const wsSessionRef = useRef<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchExistingSession = async () => {
      if (!sessionId) {
        const { chats } = await listChats();
        const ongoing = chats.find((c) => !c.is_finished);
        if (ongoing) {
          setSessionId(ongoing.session_id);
          setIsNewSession(false);
        } else {
          setIsNewSession(true);
        }
      }
    };
    fetchExistingSession();
  }, [sessionId, setSessionId]);

  useEffect(() => {
    let isMounted = true;

    const initiateWebSocket = async (sessionIdOverride?: string) => {
      const isAccessTokenConnection = !sessionIdOverride;
      if (
        sessionIdOverride &&
        wsSessionRef.current &&
        socketRef.current?.readyState === WebSocket.OPEN &&
        wsSessionRef.current === sessionIdOverride
      ) {
        return; // Prevent reconnect only if currently connected to the same session
      }
      // 1. 이전 소켓 종료
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }

      // 2. 기존 ping 중단
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
      }

      const ws = await connectChatWebSocket((data) => {
        if (!isMounted) return;

        addChatEvent(data);

        if (
          data.action === "notify" &&
          data.payload === "conversation_finished"
        ) {
          setShowEndSessionModal(true);
        }

        if (data.action === "notify") {
          if (data.session_id && isAccessTokenConnection) {
            wsSessionRef.current = data.session_id;
            socketRef.current?.close();
            if (pingIntervalRef.current) {
              clearInterval(pingIntervalRef.current);
              pingIntervalRef.current = null;
            }
            initiateWebSocket(data.session_id);
            return;
          }

          if (
            (data.payload === "existing_conversation" ||
              data.payload === "new_conversation") &&
            data.session_id
          ) {
            if (
              !wsSessionRef.current ||
              wsSessionRef.current !== data.session_id
            ) {
              wsSessionRef.current = data.session_id;
              socketRef.current?.close();
              if (pingIntervalRef.current) {
                clearInterval(pingIntervalRef.current);
                pingIntervalRef.current = null;
              }
              initiateWebSocket(data.session_id);
            }
            setSessionId(data.session_id);
          } else if (data.payload === "conversation_archived") {
            setSessionId(null);
          }
        }
      }, sessionIdOverride);

      // 3. 새 소켓 저장
      socketRef.current = ws;

      // 4. ping 시작
      pingIntervalRef.current = setInterval(() => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ action: "ping" }));
        }
      }, 10000);
    };

    // Initialize wsSessionRef.current and call initiateWebSocket
    wsSessionRef.current = sessionId ?? null;
    initiateWebSocket(sessionId ?? undefined);

    return () => {
      isMounted = false;
      socketRef.current?.close();
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };
  }, [addChatEvent, setSessionId, sessionId]);
  const handleSendMessage = useCallback(
    (text: string) => {
      const messageId = `user-${Date.now()}`;
      sendWebSocketMessage({ action: "chat", payload: text });
      addChatEvent({
        action: "chat",
        payload: text,
        message_id: messageId,
        session_id: sessionId || "",
      });
    },
    [addChatEvent, sessionId]
  );

  const handleContinueChat = useCallback(() => {
    setIsNewSession(false);
    setShowEndSessionModal(false);
  }, []);

  const handleEndChat = useCallback(() => {
    setShowEndSessionModal(false);
    setShowChatResultModal(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const latestEvent = chatEvents[chatEvents.length - 1];
    if (
      latestEvent?.action === "notify" &&
      latestEvent?.payload === "conversation_finished"
    ) {
      setShowEndSessionModal(true);
    }
  }, [chatEvents]);

  return (
    <main className="relative flex flex-col h-screen overflow-hidden bg-white">
      <div className="h-32 flex-shrink-0">
        <HeaderCard />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden mt-16 flex flex-col gap-4 px-4 py-4 mb-8">
        <DateChip date={new Date()} />
        {isNewSession ? <IntroSection /> : <ChatSection />}
        {selectedOption === "Test" && suggestedTest !== null && <TestSection />}
      </div>

      <div className="h-[120px] flex-shrink-0">
        <ChatInputBox
          chatInput={chatInput}
          setChatInput={setChatInput}
          onSubmit={handleSendMessage}
        />
      </div>

      {showEndSessionModal && (
        <EndSessionModal
          onClose={handleContinueChat}
          onConfirm={handleEndChat}
        />
      )}
      {showChatResultModal && (
        <ChatResultModal
          onClose={() => {
            setShowChatResultModal(false);
            setSelectedOption("");
            setChatInput("");
            setSessionId(null);
            setIsNewSession(true);
          }}
        />
      )}
    </main>
  );
}

export default HomePage;
