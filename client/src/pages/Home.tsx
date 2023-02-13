import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link to="/createticket">Create ticket</Link>
      <Link to="/admin">Tickets</Link>
    </div>
  );
}
