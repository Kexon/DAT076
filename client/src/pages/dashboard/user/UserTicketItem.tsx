import { Badge } from 'flowbite-react';
import { HiOutlineMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Ticket } from '../../../model/Ticket';

/**
 * This component is used to display a ticket in the UserTickets.tsx.
 * @param ticket The ticket to display
 * @returns A component that displays a ticket in the UserTickets.tsx.
 */
export default function UserPageTicket({ ticket }: { ticket: Ticket }) {
  const { title, open } = ticket;
  return (
    <Link
      to={`/user/ticket?id=${ticket.id}`}
      className=" m-[-1px] flex h-16 gap-2 border-2 p-1 hover:bg-slate-200"
      type="button"
    >
      <div className="flex w-10 items-center justify-center">
        <HiOutlineMail size={36} className="text-gray-300" />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex justify-between gap-1">
          <h3 className="flex-1 truncate text-base font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            <Badge
              color={open ? 'success' : 'failure'}
              className=" h-6 w-fit justify-self-center text-center"
            >
              {open ? 'Open' : 'Closed'}
            </Badge>
          </div>
        </div>
        <div className="flex justify-between pr-2">
          <p className="text-xs font-thin">Last message: 20/02-2023</p>
          <p>&gt;</p>
        </div>
      </div>
    </Link>
  );
}
