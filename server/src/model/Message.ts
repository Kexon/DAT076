import { UserInfo } from "./User";
export interface Message {
  id: string;
  chatId: string;
  timestamp: Date;
  sender: UserInfo;
  content: string;
}
