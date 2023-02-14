import { Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Ticket from '../../../model/Ticket';
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
    <div className="flex h-max justify-center">
      <div className="bg bg-color=5 bg-blue flex w-full flex-col items-center gap-2 p-5 lg:w-3/4 xl:w-2/3">
        <Card className="h-fit w-full">
          <h1 className="text-3xl font-bold text-gray-800">Tickets</h1>
        </Card>
        <Card className="w-full">
          <div className="-mb-2 flex w-full flex-col border-b-2 border-slate-500">
            <div className="grid grid-flow-col grid-cols-10 gap-x-1 text-lg font-semibold">
              <p className="col-span-3 ">ID</p>
              <p className="col-span-5">Title</p>
              <p className="col-span-2 text-center">Status</p>
            </div>
          </div>
          <div className="flex w-full flex-col divide-y-2 divide-slate-300">
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
        </Card>
      </div>
    </div>
  );
}
