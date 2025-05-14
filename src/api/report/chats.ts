import { http } from "../fetch";
import { EmotionTypes } from "../onboarding/addition";

export interface SummaryResponse {
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

export interface ChatResponse {
  chat_duration: string;
  id: string;
  is_archived: boolean;
  is_finished: boolean;
  session_id: string;
  started_date: string;
  summary: SummaryResponse;
}

type History = {
  content: string;
  id: string;
  metadata: number[];
  role: string;
  when: string;
};

export interface ChatDetailResponse extends ChatResponse {
  histories: History[];
  summary: SummaryResponse;
}

export const getChats = async (params: {
  datetime_gte: string;
  datetime_lte: string;
  dominant_emotions: string;
  matching_content: string;
}): Promise<{ chats: ChatResponse[] }> => {
  const { response } = await http.get<{ chats: ChatResponse[] }>(
    `/chats`,
    params
  );
  return response;
};

export const getChatDetail = async (
  sessionId: string
): Promise<ChatDetailResponse> => {
  const { response } = await http.get<ChatDetailResponse>(
    `/chats/${sessionId}`
  );
  return response;
};
