import { Button, Select, TextInput } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Ticket } from '../../../../model/Ticket';
import AdminTicketItem from './AdminTicketItem';
import isMobile from '../../../../utils/Utilities';
import TicketService from '../../../../services/TicketService';

/**
 * This component is used to display all tickets.
 * This can right now be visited by regular users, however only admins should be able to visit this page.
 */

export default function AllTicketsPage() {
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeButtonIndex, setActiveButtonIndex] = useState<string>('All');

  /**
   * This effect is used to get all tickets.
   */
  useEffect(() => {
    const getTickets = async () => {
      const data = await TicketService.getTickets();
      setAllTickets(data);
      setTickets(data);
    };
    getTickets();
  }, []);

  /*
   * handleSort and handleSortButton are the same function, but one is for the select element
   * and the other is for the buttons. Both of these should just call the same function
   *
   */
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
    <div className="flex h-full w-full flex-col justify-start gap-4">
      <div className="flex justify-center">
        <h1 className="text-center text-lg font-medium">Tickets</h1>
      </div>
      <div className="flex w-full justify-between gap-2">
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
                activeButtonIndex === 'All' ? 'bg-blue-100' : 'bg-white'
              }
              onClick={() => handleSortButton('All')}
            >
              All
            </Button>
            <Button
              color="gray"
              className={
                activeButtonIndex === 'Open' ? 'bg-blue-100' : 'bg-white'
              }
              onClick={() => handleSortButton('Open')}
            >
              Open
            </Button>
            <Button
              color="gray"
              className={
                activeButtonIndex === 'Closed' ? 'bg-blue-100' : 'bg-white'
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
    </div>
  );
}
