import { Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { HiRefresh } from 'react-icons/hi';
import { Ticket } from '../../../model/Ticket';
import ApiService from '../../../services/ApiService';
import UserPageTicket from './UserTicketItem';

export default function UserPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    if (!refresh) return;
    const getTickets = async () => {
      const data = await ApiService.getTickets();
      setTickets(data);
    };
    getTickets();
    setRefresh(false);
  }, [refresh]);
  return (
    <div className="flex h-full w-full flex-col justify-start gap-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">My tickets</h2>
        <button type="button" onClick={() => setRefresh(true)}>
          <HiRefresh size={26} className="h-full text-blue-600" />
        </button>
      </div>
      <div className="flex flex-col flex-wrap">
        {tickets.map((ticket) => (
          <UserPageTicket key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
