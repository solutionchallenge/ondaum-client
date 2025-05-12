import { http } from "../fetch";

export interface ChatEmotion {
  emotion: string;
  rate: number;
}

export interface ChatSummary {
  emotions: ChatEmotion[];
  keywords: string[];
  recommendations: string[];
  text: string;
  title: string;
}

export interface Chat {
  chat_duration: string;
  id: string;
  is_archived: boolean;
  is_finished: boolean;
  session_id: string;
  started_date: string;
  summary: ChatSummary;
  user_id: string;
  user_timezone: string;
}

export interface ListChatsResponse {
  chats: Chat[];
}

export const listChats = async () => {
  const { response } = await http.get<ListChatsResponse>("/chats");
  return response;
};

export const getChatSummary = async (
  sessionId: string
): Promise<ChatSummary> => {
  const { response } = await http.get<ChatSummary>(
    `/chat/session-id?session_id=${sessionId}`
  );
  return response;
};

export const archiveChat = async (sessionId: string): Promise<void> => {
  const { response } = await http.post(`/chats/${sessionId}/archive`);
  return response;
};
