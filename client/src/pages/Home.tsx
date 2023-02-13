import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="">
      <button type="button">
        Go to ticket form
        <Link to="/" />
      </button>
    </div>
  );
}
