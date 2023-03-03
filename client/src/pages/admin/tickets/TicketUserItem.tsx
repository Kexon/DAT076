import { Avatar, Badge } from 'flowbite-react';
import { Ticket } from '../../../model/Ticket';

interface Props {
  ticket?: Ticket;
  isTicketOpen?: boolean;
}

export default function TicketUserItem({ ticket, isTicketOpen }: Props) {
  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-1 border-2 border-blue-50 p-4 shadow-lg">
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
      <hr className="my-1 h-px border-0 bg-gray-200 dark:bg-gray-300" />
      <div className="mt-1 flex">
        <div className="flex items-center justify-center gap-3">
          <Avatar
            rounded
            size="md"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
          <div className="flex">
            <h1 className="text-base font-semibold">{ticket.owner.username}</h1>
            <h1 className="text-base">&nbsp;opened a ticket</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
