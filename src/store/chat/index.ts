export interface ChatEvent {
  type: "user" | "bot";
  content: string;
  messageId: string;
}
