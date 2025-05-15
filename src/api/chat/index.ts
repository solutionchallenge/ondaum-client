import { http } from "../fetch";
import { EmotionTypes } from "../onboarding/addition";

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

export interface ChatSummary {
  emotions: {
    emotion: EmotionTypes;
    rate: 0;
  }[];
  keywords: string[];
  recommendations: string[];
  text: string;
  title: string;
  main_topic: {
    begin_message_id: string;
    end_message_id: string;
  };
  topic_messages: History[];
}

export interface ChatSummaryReponse {
  success: boolean;
  created: boolean;
  returning: ChatSummary;
}

export interface ListChatsResponse {
  chats: Chat[];
}

export const listChats = async () => {
  const { response } = await http.get<ListChatsResponse>("/chats");
  return response;
};

export const putChatSummary = async (
  session_id: string
): Promise<ChatSummary> => {
  const { response } = await http.put<ChatSummaryReponse>(
    `/chats/${session_id}/summary`
  );
  if (response.success) {
    return response.returning;
  } else {
    throw new Error("Failed to fetch chat summary.");
  }
};

export const archiveChat = async (session_id: string): Promise<void> => {
  const { response } = await http.post(`/chats/${session_id}/archive`);
  return response;
};
