import { CiSettings } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

/**
 * The navbar component.
 */
export default function NavBar() {
  return (
    <nav
      className="w-vw mb-5 flex h-12 items-center justify-between bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md lg:mb-10
"
    >
      <div className="mx-auto flex w-[1152px] justify-between">
        <Link
          className="pl-3 text-lg font-bold text-white transition ease-in-out hover:scale-120"
          to="/"
        >
          tickino
        </Link>
        <div className="flex gap-x-3 pr-3 text-white">
          <Link
            type="button"
            className="transition ease-in-out hover:scale-120 hover:text-gray-200"
            to="/user/settings"
          >
            <CiSettings className="h-7 w-7" />
          </Link>
          <Link
            type="button"
            className="transition ease-in-out hover:scale-120 hover:text-gray-200"
            to="/user"
          >
            <CgProfile className="h-7 w-7" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
