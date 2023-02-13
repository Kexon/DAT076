import { CiSettings } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';

export default function NavBar() {
  return (
    <nav
      className="w-vw flex h-12 items-center justify-between bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md
"
    >
      <div className="pl-3 text-lg font-bold text-white">ticket-system</div>
      <div className="flex gap-x-3 pr-3 text-white">
        <button
          type="button"
          className="transition ease-in-out hover:scale-120 hover:text-gray-200"
        >
          <CiSettings className="h-7 w-7" />
        </button>
        <button
          type="button"
          className="transition ease-in-out hover:scale-120 hover:text-gray-200"
        >
          <CgProfile className="h-7 w-7" />
        </button>
      </div>
    </nav>
  );
}
