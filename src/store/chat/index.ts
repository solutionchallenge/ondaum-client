export type ChatAction = "chat" | "notify" | "data" | "ping";

export type NotifyPayload =
  | "new_conversation"
  | "existing_conversation"
  | "conversation_finished"
  | "conversation_archived";

export interface DataPayload {
  type: "text";
  data: string;
}

export interface ChatEvent {
  action: ChatAction;
  payload: string;
  session_id?: string;
  message_id: string;
}

import { create } from "zustand";

interface ChatStore {
  selectedOption: "Chat" | "Test" | "";
  hasSelectedOption: boolean;
  isConnected: boolean;
  sessionId: string | null;
  chatEvents: ChatEvent[];
  suggestedTest: string | null;
  summary: string;
  mood: string;
  themes: string[];
  moodScore: number;
  setSelectedOption: (option: "Chat" | "Test" | "") => void;
  setHasSelectedOption: (value: boolean) => void;
  setConnectionStatus: (status: boolean) => void;
  setSessionId: (id: string | null) => void;
  addChatEvent: (event: ChatEvent) => void;
  clearChatEvents: () => void;
  setSuggestedTest: (test: string | null) => void;
  setSummary: (s: string) => void;
  setMood: (m: string) => void;
  setThemes: (t: string[]) => void;
  setMoodScore: (n: number) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedOption: "",
  hasSelectedOption: false,
  isConnected: false,
  sessionId: null,
  chatEvents: [],
  suggestedTest: null,
  summary: "",
  mood: "",
  themes: [],
  moodScore: 0,
  setSelectedOption: (option) => set({ selectedOption: option }),
  setHasSelectedOption: (value) => set({ hasSelectedOption: value }),
  setConnectionStatus: (status) => set({ isConnected: status }),
  setSessionId: (id) => set({ sessionId: id }),
  addChatEvent: (event) =>
    set((state) => ({ chatEvents: [...state.chatEvents, event] })),
  clearChatEvents: () => set({ chatEvents: [] }),
  setSuggestedTest: (test) => set({ suggestedTest: test }),
  setSummary: (s) => set({ summary: s }),
  setMood: (m) => set({ mood: m }),
  setThemes: (t) => set({ themes: t }),
  setMoodScore: (n) => set({ moodScore: n }),
}));
