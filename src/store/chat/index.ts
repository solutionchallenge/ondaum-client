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
