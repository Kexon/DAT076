import Message from '../model/Message';
import axiosInstance from '../utils/AxiosInstance';

export default class MessageService {
  static async getMessages(ticketId: string): Promise<Message[]> {
    const { data } = await axiosInstance.get(`/message/chat/${ticketId}`);
    return data;
  }
}
