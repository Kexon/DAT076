import { Sidebar } from 'flowbite-react';
import {
  HiInbox,
  HiUser,
  HiCog,
  HiPencilAlt,
  HiViewGrid,
  HiLogout,
} from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import Hamburger from '../../components/Hamburger';
import { useAuth } from '../../hooks/AuthProvider';
import { UserLevel } from '../../model/User';
import AllTicketsPage from './admin/tickets/AllTicketsPage';
import AllUsersPage from './admin/users/AllUsersPage';
import TicketPage from './ticket/TicketPage';
import TicketFormPage from './TicketFormPage';
import UserSettingsPage from './user/UserSettingsPage';
import UserTickets from './user/UserTickets';

/**
 * This page is the main page for the user. It contains a sidebar with links to
 * different pages and a main content area that displays the page that the user
 * has selected.
 */
export default function Dashboard() {
  const { user, logout } = useAuth();
  const isAdmin = user && user.level >= UserLevel.ADMIN;
  const navigate = useNavigate();
  const { tab } = useParams();

  const handleClickButton = (to: string) => {
    navigate(`/user/${to}`);
  };

  const handleSignOut = () => {
    logout();
  };

  const renderComponent = () => {
    switch (tab) {
      case 'settings':
        return <UserSettingsPage />;
      case 'createticket':
        return <TicketFormPage />;
      case 'alltickets':
        // eslint-disable-next-line react/jsx-no-undef
        return <AllTicketsPage />;
      case 'tickets':
        return <UserTickets />;
      case 'ticket':
        return <TicketPage />;
      case 'users':
        return <AllUsersPage />;
      default:
        return <UserTickets />;
    }
  };

  return (
    <div>
      <Hamburger />
      <div className="flex md:mt-32">
        <div className="hidden flex-col md:flex">
          <h1 className="pl-5 text-3xl font-semibold">Account panel</h1>
          <div className="flex gap-1">
            <div className="w-fit ">
              <Sidebar aria-label="Default sidebar example">
                <Sidebar.Items>
                  {isAdmin && (
                    <Sidebar.ItemGroup>
                      <Sidebar.Item
                        icon={HiViewGrid}
                        label="Admin"
                        className={`${
                          tab === 'alltickets' ? 'bg-blue-100' : ''
                        } hover:cursor-pointer`}
                        onClick={() => handleClickButton('alltickets')}
                      >
                        All tickets
                      </Sidebar.Item>
                      <Sidebar.Item
                        icon={HiUser}
                        label="Admin"
                        className={`${
                          tab === 'users' ? 'bg-blue-100' : ''
                        } hover:cursor-pointer`}
                        onClick={() => handleClickButton('users')}
                      >
                        Users
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  )}
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      icon={HiInbox}
                      onClick={() => handleClickButton('tickets')}
                      className={`${
                        tab === 'tickets' ? 'bg-blue-100' : ''
                      } hover:cursor-pointer`}
                    >
                      My tickets
                    </Sidebar.Item>
                    <Sidebar.Item
                      icon={HiPencilAlt}
                      onClick={() => handleClickButton('createticket')}
                      className={`text-lg font-semibold hover:cursor-pointer ${
                        tab === 'createticket' ? 'bg-blue-100' : ''
                      }`}
                    >
                      Create ticket
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>

                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      icon={HiCog}
                      onClick={() => handleClickButton('settings')}
                      className={`${
                        tab === 'settings' ? 'bg-blue-100' : ''
                      } hover:cursor-pointer`}
                    >
                      Settings
                    </Sidebar.Item>
                    <Sidebar.Item
                      icon={HiLogout}
                      onClick={handleSignOut}
                      className="hover:cursor-pointer"
                    >
                      Sign out
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </Sidebar>
            </div>
          </div>
        </div>
        <div>
          <hr className="mt-4 h-[360px] w-px bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex flex-1 flex-col gap-10 rounded-lg px-2 pt-2 lg:px-6">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
