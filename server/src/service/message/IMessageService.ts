import { Message } from "../../model/Message";

export default interface IMessageService {
  getMessage(chatId: string): Promise<Message>;
  getMessages(chatId: string): Promise<Message[]>;
  sendMessage(
    chatId: string,
    sender: string,
    message: string
  ): Promise<boolean>;
  updateMessage(id: string, message: string): Promise<Message>;
}
