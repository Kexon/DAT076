import { Badge } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from '../../../../model/Ticket';
import { UserInfo } from '../../../../model/User';
import UserService from '../../../../services/UserService';
import isMobile from '../../../../utils/Utilities';

/**
 * This component is used to display a ticket in the AllTicketsPage.
 * @param ticket - The ticket to display.
 * @returns A component that displays a ticket.
 */
export default function AdminTicketItem({ ticket }: { ticket: Ticket }) {
  const { id, title, open } = ticket;
  const [user, setUser] = useState<UserInfo>();

  /**
   * This effect is used to get the user that created the ticket.
   */
  useEffect(() => {
    const getUser = async () => {
      if (ticket) {
        const data = await UserService.getUserById(ticket.owner.id); // Isn't this a bit redundant? ticket.owner already contains the user info.
        setUser(data);
      }
    };
    getUser();
  }, [ticket?.id]);
  return (
    <div>
      {isMobile() ? (
        <Link
          to={`/user/ticket?id=${ticket.id}`}
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
          to={`/user/ticket?id=${ticket.id}`}
          className="grid grid-flow-col grid-cols-10 items-center gap-x-1 py-2 hover:bg-slate-300"
          type="button"
        >
          <p className="col-span-3 ml-2 h-6 truncate text-left md:col-span-2">
            ...{id.substring(id.length - 5, id.length)}
          </p>
          <p className="col-span-1 hidden md:flex">{user?.username}</p>
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
