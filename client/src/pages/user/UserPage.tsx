import { Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Ticket } from '../../model/Ticket';
import ApiService from '../../services/ApiService';
import AdminTicketItem from '../admin/tickets/AdminTicketItem';
import UserPageTicket from './UserPageTicket';

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
    <div>
      <Card className="text-3xl font-semibold">Greetings Traveler.</Card>
      <div className="grid grid-flow-row sm:grid-flow-col">
        <Card className="col-span-1 w-full">Account Settings</Card>
        <Card className="col-span-1 divide-slate-400">
          <h2 className="text-lg font-medium">Account tickets</h2>
          <div className="flex flex-col flex-wrap">
            {tickets.map((ticket) => (
              <UserPageTicket ticket={ticket} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
