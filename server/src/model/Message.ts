import { UserInfo } from "./User";
export interface Message {
  id: string;
  chatId: string;
  timestamp: Date;
  sender: UserInfo;
  content: string;
  systemMessage: boolean;
}

export interface NewMessage {
  chatId: string;
  sender: string;
  content: string;
  systemMessage: boolean;
}
