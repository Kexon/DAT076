import axios from 'axios';
import { Ticket, NewTicket } from '../model/Ticket';

const API_URL = 'http://localhost:8080';

export default class ApiService {
  static async getTickets(): Promise<Ticket[]> {
    const { data } = await axios.get<Ticket[]>(`${API_URL}/ticket`);
    return data;
  }

  static async getTicket(id: number): Promise<Ticket> {
    const { data } = await axios.get<Ticket>(`${API_URL}/ticket/${id}`);
    return data;
  }

  static async createTicket(ticket: NewTicket): Promise<Ticket> {
    const { data } = await axios.post<Ticket>(`${API_URL}/ticket`, ticket);
    return data;
  }

  static async closeTicket(id: number): Promise<void> {
    await axios.patch(`${API_URL}/ticket/${id}`, { open: false });
  }

  static async openTicket(id: number): Promise<void> {
    await axios.patch(`${API_URL}/ticket/${id}`, { open: true });
  }
}
