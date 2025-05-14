import { http } from "../fetch";
import { EmotionTypes } from "../onboarding/addition";
import { ChatResponse } from "./chats";

export interface ReportResponse {
  average_chat_duration: string;
  average_negative_score: number;
  average_neutral_score: number;
  average_positive_score: number;
  datetime_gte: string;
  datetime_lte: string;
  emotion_counts: [
    {
      count: number;
      emotion: EmotionTypes;
    },
  ];
  stress_level_descriptor: {
    description: string;
    threshold: number;
    title: string;
  };
  total_chat_count: number;
}

export const getChatReport = async (params: {
  datetime_gte: string;
  datetime_lte: string;
}): Promise<ReportResponse> => {
  const { response } = await http.get<ReportResponse>(`/chat-reports`, params);
  return response;
};

export const getChatById = async (params: {
  message_id: string;
}): Promise<{ chats: ChatResponse[] }> => {
  const { response } = await http.get<{ chats: ChatResponse[] }>(
    `/chats`,
    params
  );
  return response;
};
