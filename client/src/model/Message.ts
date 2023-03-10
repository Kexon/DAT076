import { UserInfo } from './User';

/**
 * Message model
 * @property {string} id - Message id
 * @property {string} chatId - Chat id
 * @property {string} content - Message content
 * @property {string} timestamp - Message timestamp
 * @property {UserInfo} sender - Message sender
 */
export default interface Message {
  id: string;
  chatId: string;
  content: string;
  timestamp: string;
  sender: UserInfo;
  systemMessage: boolean;
}
