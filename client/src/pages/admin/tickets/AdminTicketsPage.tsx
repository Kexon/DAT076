import { Button, Card } from 'flowbite-react';
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
      <div className="bg bg-color=5 bg-blue flex w-full flex-col items-center gap-2 p-5">
        <Card className="w-full justify-center">
          <div className="flex justify-center">
            <h1 className="w-fit border-b-2 border-slate-200 text-center text-3xl font-bold text-gray-800">
              Tickets
            </h1>
          </div>
          <Button.Group className="justify-center">
            <Button color="gray" className="w-20">
              All
            </Button>
            <Button color="gray" className="w-20">
              Open
            </Button>
            <Button color="gray" className="w-20">
              Closed
            </Button>
          </Button.Group>
          <div className="-mb-4 hidden w-full flex-col border-b-2 border-slate-500 sm:flex">
            <div className="grid grid-flow-col grid-cols-10 gap-x-1 text-lg font-semibold">
              <p className="col-span-3 ml-2 md:col-span-2">ID</p>
              <p className="col-span-1 hidden md:flex">User</p>
              <p className="col-span-4">Title</p>
              <p className="col-span-2 text-center">Status</p>
              <p className="col-span-1 mr-2 inline text-right">Date</p>
            </div>
          </div>
          <div className="flex w-full flex-col divide-y-2 divide-slate-100">
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
