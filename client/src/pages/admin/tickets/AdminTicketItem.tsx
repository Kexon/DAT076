import { Badge } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Ticket from '../../../model/Ticket';

export default function AdminTicketItem({ id, title, open }: Ticket) {
  return (
    <Link
      to={`/admin/tickets/${id}`}
      className="grid grid-flow-col grid-cols-10 items-center gap-x-1 py-2 hover:bg-slate-300"
      type="button"
    >
      <p className="col-span-3 h-6 truncate text-left md:col-span-2">{id}</p>
      <p className="col-span-1 hidden md:flex">User</p>
      <p className="col-span-5 h-6 truncate text-left sm:col-span-4">{title}</p>
      <Badge
        color={open ? 'success' : 'failure'}
        className="col-span-2 mx-5 h-6 w-fit justify-self-center text-center"
      >
        {open ? 'Open' : 'Closed'}
      </Badge>
      <p className="col-span-1 hidden sm:flex">Date</p>
    </Link>
  );
}
