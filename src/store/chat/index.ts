export interface ChatEvent {
  sender: "user" | "server";
  text: string;
  bold: boolean;
}
