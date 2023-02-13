import Ticket from '../../../classes/Ticket';

export default function AdminTicketItem({
  id,
  title,
  description,
  open,
}: Ticket) {
  return (
    <div className="grid grid-flow-col grid-cols-4">
      <p className="h-6">{id}</p>
      <p className="h-6">{title}</p>
      <p className="h-6 truncate">{description}</p>
      <p className="h-6 text-right">{open ? 'Open' : 'Closed'}</p>
    </div>
  );
}
