import { NewMessage } from "./../../model/Message";
import { Message } from "../../model/Message";

/**
 * IMessageService is an interface that defines the methods that a message service
 * should implement.
 */
export default interface IMessageService {
  getMessage(chatId: string): Promise<Message>;
  getMessages(chatId: string): Promise<Message[]>;
  sendMessage(message: NewMessage): Promise<Message>;
  updateMessage(id: string, message: string): Promise<Message>;
}
