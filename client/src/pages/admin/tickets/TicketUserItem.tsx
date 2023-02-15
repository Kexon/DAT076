import { Avatar, Button } from 'flowbite-react';
import { useState } from 'react';
import { Ticket } from '../../../model/Ticket';
import ApiService from '../../../services/ApiService';

interface Props {
  ticket?: Ticket;
}

export default function TicketUserItem({ ticket }: Props) {
  if (!ticket) return <div>Loading...</div>;

  const [isTicketOpen, setIsTicketOpen] = useState<boolean>(ticket.open);
  const onTicketButtonClick = () => {
    setIsTicketOpen((ticketStatus) => !ticketStatus);
    if (isTicketOpen) ApiService.closeTicket(ticket.id);
    else ApiService.openTicket(ticket.id);
  };

  return (
    <div className="col-span-2 mx-3 mt-1 max-h-[250px] rounded-sm bg-white p-2 shadow-lg">
      <div className="flex justify-center">
        <div className="lg:text-2x flex text-base lg:text-lg">
          <h1 className="">Ticket&nbsp; </h1>
          <h1
            className="font-bold
    "
          >
            #{ticket.id}
          </h1>
        </div>
      </div>
      <hr className="my-1 h-px border-0 bg-gray-200 dark:bg-gray-300" />
      <div
        className="flex min-h-[200px] items-center justify-center 
  "
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <Avatar rounded size="lg" />
          <div className="flex">
            <h1 className="text-lg font-thin">Created by&nbsp; </h1>
            <h1 className="text-lg font-bold">John Doe</h1>
          </div>
          {!isTicketOpen ? (
            <Button color="success" size="xs" onClick={onTicketButtonClick}>
              Open ticket
            </Button>
          ) : (
            <Button color="failure" size="xs" onClick={onTicketButtonClick}>
              Close ticket
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
