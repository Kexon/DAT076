import { UserInfo } from './User';

export default interface Message {
  id: string;
  chatId: string;
  content: string;
  timestamp: string;
  sender: UserInfo;
  systemMessage: boolean;
}
