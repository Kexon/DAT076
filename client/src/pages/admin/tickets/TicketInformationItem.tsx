import { Ticket } from '../../../model/Ticket';

interface Props {
  ticket?: Ticket;
}

export default function TicketInformationItem({ ticket }: Props) {
  return (
    <div className="col-span-4 mt-2 max-w-screen-xl rounded-md bg-slate-100 p-3 shadow-lg">
      <div className="flex flex-col">
        <h1
          className="break-words text-sm font-bold lg:text-xl
"
        >
          {ticket?.title}
        </h1>
        <h3 className="text-sm font-thin">Category</h3>
      </div>
      <div className="mt-5">
        <div
          className="rounded-sm bg-white p-2 shadow-lg

"
        >
          <p className="flex-1 break-words text-sm font-thin">
            {ticket?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
