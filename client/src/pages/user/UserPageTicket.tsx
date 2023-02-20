import { Badge } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Ticket } from '../../model/Ticket';

export default function UserPageTicket({ ticket }: { ticket: Ticket }) {
  const { title, open, description } = ticket;
  return (
    <Link
      to={`/ticket/${ticket.id}`}
      className=" m-[-1px] flex h-20 flex-col border-y-2 py-1 hover:bg-slate-200"
      type="button"
    >
      <div className="flex justify-between">
        <h1>{title}</h1>
        <div className="flex items-center gap-2">
          <p className="text-sm font-thin">20/02-2023</p>
          <Badge
            color={open ? 'success' : 'failure'}
            className=" h-6 w-fit justify-self-center text-center"
          >
            {open ? 'Open' : 'Closed'}
          </Badge>
        </div>
      </div>
      <p className="h-full w-1/2 truncate text-sm font-thin">{description}</p>
    </Link>
  );
}
