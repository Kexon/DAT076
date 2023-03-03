import { NewMessage } from "./../../model/Message";
import { Message } from "../../model/Message";
import IMessageService from "./IMessageService";
import { messageModel } from "../../db/message.db";

class MessageDBService implements IMessageService {
  async getMessage(messageId: string): Promise<Message> {
    const message = await messageModel
      .findById(messageId)
      .populate("sender")
      .exec();
    if (message) return message;
    console.log(message);
    throw new Error("Message not found");
  }

  /*
   * Return all messages with the same chat
   */
  async getMessages(chatId: string): Promise<Message[]> {
    return await messageModel
      .find({ chatId: chatId })
      .populate("sender")
      .exec();
  }

  /*
   * Adds a message to the database.
   * The chatId is always same as the ticketId.
   */
  async sendMessage({
    chatId,
    sender,
    content,
    systemMessage,
  }: NewMessage): Promise<Message> {
    let ticket = await messageModel.create({
      chatId,
      content,
      timestamp: new Date(),
      sender,
      systemMessage,
    });

    // We need to do this in order for the sender to be referenced when returning the ticket
    // I don't know why though
    ticket = await ticket.populate("sender");

    // We need to check if the ticket is closed or not
    // Right now we do not do that

    if (ticket) return ticket;
    throw new Error("Message could not be created");
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
