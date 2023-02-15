import { Badge } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Ticket from '../../../model/Ticket';
import isMobile from '../../../utils/Utilities';

export default function AdminTicketItem({ ticket }: { ticket: Ticket }) {
  const { id, title, open } = ticket;
  return (
    <div>
      {isMobile() ? (
        <Link
          to={`/ticket/${id}`}
          className="flex h-fit flex-col gap-x-1 p-2 hover:bg-slate-300"
          type="button"
        >
          <div className="flex w-full flex-row items-center justify-between">
            <div
              className="flex items-center gap-2
            "
            >
              <p className="font font-semibold">{id}</p>
              <Badge
                color={open ? 'success' : 'failure'}
                className=" h-6 w-fit justify-self-center text-center"
              >
                {open ? 'Open' : 'Closed'}
              </Badge>
            </div>
            <p className="text-sm font-thin">date</p>
          </div>
          <div className="flex w-full flex-row justify-between">
            <p className="ml-1">{title}</p>
            <p className="text-lg font-semibold text-slate-300">&gt;</p>
          </div>
        </Link>
      ) : (
        <Link
          to={`/ticket/${id}`}
          className="grid grid-flow-col grid-cols-10 items-center gap-x-1 py-2 hover:bg-slate-300"
          type="button"
        >
          <p className="col-span-3 ml-2 h-6 truncate text-left md:col-span-2">
            {id}
          </p>
          <p className="col-span-1 hidden md:flex">User</p>
          <p className="col-span-5 h-6 truncate text-left sm:col-span-4">
            {title}
          </p>
          <Badge
            color={open ? 'success' : 'failure'}
            className="col-span-2 mx-5 h-6 w-fit justify-self-center text-center"
          >
            {open ? 'Open' : 'Closed'}
          </Badge>
          <p className="col-span-1 mr-2 hidden text-right sm:inline">Date</p>
        </Link>
      )}
    </div>
  );
}
