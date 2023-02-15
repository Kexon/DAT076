import { Button, Card, Select, TextInput } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import Ticket from '../../../model/Ticket';
import AdminTicketItem from './AdminTicketItem';
import isMobile from '../../../utils/Utilities';

/*
 * I dislike the name on this function, but I'm not sure what to call it.
 * AdminListPage? AdminTicketListPage? AdminTicketList?
 *
 * If you're wondering why I end the page names with Page, it's because
 * it's easier in my opinion to differentiate whether this file is a page or a component
 */
export default function TicketListPage() {
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeButtonIndex, setActiveButtonIndex] = useState<string>('All');

  useEffect(() => {
    /* Move this to service */
    fetch('http://localhost:8080/ticket')
      .then((response) => response.json())
      .then((data) => {
        setAllTickets(data);
        setTickets(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /* Move some of tis content this to service */
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === 'Open') {
      setTickets(allTickets.filter((ticket) => ticket.open));
      setActiveButtonIndex(value);
    } else if (value === 'Closed') {
      setTickets(allTickets.filter((ticket) => !ticket.open));
      setActiveButtonIndex(value);
    } else {
      setTickets(allTickets);
      setActiveButtonIndex(value);
    }
  };

  const handleSortButton = (status: string) => {
    if (status === 'Open') {
      setTickets(allTickets.filter((ticket) => ticket.open));
      setActiveButtonIndex(status);
    } else if (status === 'Closed') {
      setTickets(allTickets.filter((ticket) => !ticket.open));
      setActiveButtonIndex(status);
    } else {
      setTickets(allTickets);
      setActiveButtonIndex(status);
    }
  };

  /* Either we want to search ticketid by exact id.
   * Or we want to search ticketid by partial id, with the id being correct from the start.
   * Or how it is right now: enter number 80, and you will get id with xx80xx in it
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === '') {
      setTickets(allTickets);
    } else {
      setTickets(
        allTickets.filter((ticket) => ticket.id.toString().includes(value)),
      );
    }
  };

  return (
    <div className="flex h-max justify-center">
      <div className="bg bg-color=5 bg-blue flex w-full flex-col items-center gap-2 p-5">
        <Card className="w-full justify-center">
          <div className="flex justify-center">
            <h1 className="w-fit border-b-2 border-slate-200 text-center text-3xl font-bold text-gray-800">
              Tickets
            </h1>
          </div>
          <div className="flex justify-between gap-2">
            {isMobile() ? (
              /* MOBILE VIEW */
              <div id="select">
                <Select
                  id="countries"
                  required={false}
                  onChange={handleSort}
                  value={activeButtonIndex}
                >
                  <option>All</option>
                  <option>Open</option>
                  <option>Closed</option>
                </Select>
              </div>
            ) : (
              /* DESKTOP VIEW */
              <Button.Group className="justify-center">
                <Button
                  color="gray"
                  className={
                    activeButtonIndex === 'All' ? 'bg-gray-200' : 'bg-white'
                  }
                  onClick={() => handleSortButton('All')}
                >
                  All
                </Button>
                <Button
                  color="gray"
                  className={
                    activeButtonIndex === 'Open' ? 'bg-gray-200' : 'bg-white'
                  }
                  onClick={() => handleSortButton('Open')}
                >
                  Open
                </Button>
                <Button
                  color="gray"
                  className={
                    activeButtonIndex === 'Closed' ? 'bg-gray-200' : 'bg-white'
                  }
                  onClick={() => handleSortButton('Closed')}
                >
                  Closed
                </Button>
              </Button.Group>
            )}
            <div>
              <TextInput
                id="searchid"
                type="searchtype"
                rightIcon={HiSearch}
                placeholder="Ticket ID"
                required={false}
                onChange={handleSearch}
              />
            </div>
          </div>
          {/* DESKTOP VIEW */}
          <div className="-mb-4 hidden w-full flex-col border-b-2 border-slate-500 sm:flex">
            <div className="grid grid-flow-col grid-cols-10 gap-x-1 text-lg font-semibold">
              <p className="col-span-3 ml-2 md:col-span-2">ID</p>
              <p className="col-span-1 hidden md:flex">User</p>
              <p className="col-span-4">Title</p>
              <p className="col-span-2 text-center">Status</p>
              <p className="col-span-1 mr-2 inline text-right">Date</p>
            </div>
          </div>
          {/* END OF DESKTOP VIEW */}
          <div className="flex w-full flex-col divide-y-2 divide-slate-100">
            {tickets.map((ticket) => (
              <AdminTicketItem key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
