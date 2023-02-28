import { Ticket, NewTicket } from '../model/Ticket';
import axiosInstance from '../utils/AxiosInstance';

export default class ApiService {
  static async getTickets(): Promise<Ticket[]> {
    const { data } = await axiosInstance.get<Ticket[]>('/ticket');
    return data;
  }

  static async getTicket(id: string): Promise<Ticket | undefined> {
    try {
      const { data } = await axiosInstance.get<Ticket>(`/ticket/${id}`);
      return data;
    } catch (error) {
      return undefined;
    }
  }

  static async createTicket(ticket: NewTicket): Promise<Ticket> {
    const { data } = await axiosInstance.post<Ticket>('/ticket', ticket);
    return data;
  }

  static async closeTicket(id: string): Promise<void> {
    await axiosInstance.patch(`/ticket/${id}`, { open: false });
  }

  static async openTicket(id: string): Promise<void> {
    await axiosInstance.patch(`/ticket/${id}`, { open: true });
  }
}
