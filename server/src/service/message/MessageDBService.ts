import { Message } from "../../model/Message";
import IMessageService from "./IMessageService";
import { messageModel } from "../../db/message.db";

class MessageDBService implements IMessageService {
  async getMessage(chatId: string): Promise<Message> {
    const message = await messageModel.findOne({ chatId: chatId }).exec();
    if (message) return message;
    throw new Error("Message not found");
  }

  /*
   * Return all messages with the same chat
   */
  async getMessages(chatId: string): Promise<Message[]> {
    return await messageModel.find({ chatId: chatId }).exec();
  }

  /*
   * Adds a message to the database.
   * The chatId is always same as the ticketId.
   */
  async sendMessage(
    chatId: string,
    sender: string,
    message: string
  ): Promise<boolean> {
    const success = await messageModel.create({
      chatId: chatId,
      content: message,
      timestamp: new Date(),
      sender: sender,
    });

    // We need to check if the ticket is closed or not

    if (success) return true;
    return false;
  }

  /*
   * Updates the content of a message.
   */
  async updateMessage(messageId: string, message: string): Promise<Message> {
    const updatedMessage = await messageModel.findByIdAndUpdate(messageId, {
      content: message,
    });
    if (updatedMessage) return updatedMessage;
    throw new Error("Message not found");
  }
}

export default function makeMessageDBService(): MessageDBService {
  return new MessageDBService();
}
