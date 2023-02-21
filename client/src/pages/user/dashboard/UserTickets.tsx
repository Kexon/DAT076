import { Card } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Ticket } from '../../../model/Ticket';
import ApiService from '../../../services/ApiService';
import UserPageTicket from './UserTicketItem';

export default function UserPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  useEffect(() => {
    const getTickets = async () => {
      const data = await ApiService.getTickets();
      setTickets(data);
    };
    getTickets();
  }, []);
  return (
    <Card className="sm:flex-1">
      <div className="flex h-full w-full flex-col justify-start gap-6">
        <h2 className="text-lg font-medium">My tickets</h2>
        <div className="flex flex-col flex-wrap">
          {tickets.map((ticket) => (
            <UserPageTicket key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </Card>
  );
}
