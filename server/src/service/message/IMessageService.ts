import { NewMessage } from "./../../model/Message";
import { Message } from "../../model/Message";

export default interface IMessageService {
  getMessage(chatId: string): Promise<Message>;
  getMessages(chatId: string): Promise<Message[]>;
  /*
   * We want to retun the message that was created,
   * so that we can display it in the chat.
   */
  sendMessage(message: NewMessage): Promise<Message>;
  updateMessage(id: string, message: string): Promise<Message>;
}
