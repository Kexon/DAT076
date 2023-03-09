import { Badge } from 'flowbite-react';
import { Ticket } from '../../../model/Ticket';

interface Props {
  ticket?: Ticket;
  isTicketOpen?: boolean;
}

export default function TicketHeader({ ticket, isTicketOpen }: Props) {
  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-1  ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="p-2 text-xl font-semibold">{ticket.title}</h1>
          <Badge
            size="md"
            color={isTicketOpen ? 'success' : 'failure'}
            className="h-6"
          >
            {isTicketOpen ? 'Open' : 'Closed'}
          </Badge>
        </div>
        <h2 className="p-2 text-right text-sm font-semibold">#{ticket.id}</h2>
      </div>
    </div>
  );
}
