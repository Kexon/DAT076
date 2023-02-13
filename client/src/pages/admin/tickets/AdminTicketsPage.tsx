import { useEffect, useState } from 'react';
import Ticket from '../../../classes/Ticket';
import AdminTicketItem from './AdminTicketItem';

/*
 * I dislike the name on this function, but I'm not sure what to call it.
 * AdminListPage? AdminTicketListPage? AdminTicketList?
 *
 * If you're wondering why I end the page names with Page, it's because
 * it's easier in my opinion to differentiate whether this file is a page or a component
 */
export default function TicketListPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/ticket')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mx-auto h-screen">
      <div className="flex h-max justify-center">
        <div className="bg bg-color=5 bg-blue flex w-full flex-col items-center gap-2 bg-slate-200 p-5 lg:w-3/4 xl:w-2/3">
          <div>
            <p className="text-3xl font-bold text-gray-800">Tickets</p>
          </div>
          <div className="flex w-full flex-col gap-y-2 border-4">
            <div className="grid grid-flow-col grid-cols-5 text-lg font-semibold">
              <p>ID</p>
              <p>Title</p>
              <p>Description</p>
              <p className="text-right">Status</p>
              <p>&#10240;</p>
            </div>
            {tickets.map((ticket) => (
              <AdminTicketItem
                title={ticket.title}
                id={ticket.id}
                description={ticket.description}
                open={ticket.open}
                authorId={ticket.authorId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
