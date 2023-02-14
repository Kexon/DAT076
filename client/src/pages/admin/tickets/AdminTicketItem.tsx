import { Badge } from 'flowbite-react';
import Ticket from '../../../model/Ticket';

export default function AdminTicketItem({ id, title, open }: Ticket) {
  return (
    <button
      className="grid grid-flow-col grid-cols-10 items-center gap-x-1 py-2 hover:bg-slate-300"
      type="button"
    >
      <p className="col-span-3 h-6 truncate text-left">{id}</p>
      <p className="col-span-5 h-6 truncate text-left">{title}</p>
      <Badge
        color={open ? 'success' : 'failure'}
        className="col-span-2 mx-5 h-6 w-fit justify-self-center text-center"
      >
        {open ? 'Open' : 'Closed'}
      </Badge>
    </button>
  );
}
