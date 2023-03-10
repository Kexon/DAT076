import Message from '../model/Message';
import axiosInstance from '../utils/AxiosInstance';

/**
 * MessageService is a class that handles all the requests to the server
 * related to the messages.
 */
export default class MessageService {
  static async getMessages(ticketId: string): Promise<Message[]> {
    const { data } = await axiosInstance.get(`/message/chat/${ticketId}`);
    return data;
  }

  static async sendMessage(chatId: string, content: string): Promise<Message> {
    const { data } = await axiosInstance.post('/message/chat', {
      chatId,
      content,
    });
    return data;
  }
}
