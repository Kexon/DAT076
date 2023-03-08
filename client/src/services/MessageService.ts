import Message from '../model/Message';
import axiosInstance from '../utils/AxiosInstance';

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
