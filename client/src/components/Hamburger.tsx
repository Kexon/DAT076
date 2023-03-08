import { ListGroup } from 'flowbite-react';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { UserLevel } from '../model/User';

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();
  const isAdmin = user && user.level >= UserLevel.ADMIN;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="mx-2 mb-2 md:hidden">
      <button
        type="button"
        className="rounded-md p-2 text-blue-500"
        onClick={toggleMenu}
      >
        {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
      </button>
      {isOpen && (
        <ListGroup className="flex-row items-center">
          {isAdmin && (
            <div>
              <Link to="/user/alltickets" onClick={toggleMenu}>
                <ListGroup.Item>All tickets</ListGroup.Item>
              </Link>
              <Link to="/user/users" onClick={toggleMenu}>
                <ListGroup.Item>Users</ListGroup.Item>
              </Link>
              <hr className="mx-2" />
            </div>
          )}
          <Link to="/user/tickets" onClick={toggleMenu}>
            <ListGroup.Item>My tickets</ListGroup.Item>
          </Link>
          <Link to="/user/createticket" onClick={toggleMenu}>
            <ListGroup.Item>Create ticket</ListGroup.Item>
          </Link>
          <hr className="mx-2" />
          <Link to="/user/settings" onClick={toggleMenu}>
            <ListGroup.Item>Settings</ListGroup.Item>
          </Link>
          <ListGroup.Item onClick={handleSignOut}>Sign out</ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
}
