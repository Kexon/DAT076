import { Select, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { UserInfo, UserLevel } from '../../../../model/User';
import UserService from '../../../../services/UserService';
import isMobile from '../../../../utils/Utilities';
import UserItem from './UserItem';

/**
 * This component is used to display all users.
 * This can right now be visited by regular users, however only admins should be able to visit this page.
 *
 * This page is copied from AllTicketsPage.tsx
 * The main difference is that this page is for users, and the other is for tickets
 * Alas, we had no time to refactor this code to be more DRY (if possible in frontend),
 * but some variables might be the same as in AdminTicketsPage.tsx, and could be confusing
 */
export default function AllUsersPage() {
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [activeButtonIndex, setActiveButtonIndex] = useState<string>('All');

  /**
   * This effect is used to get all users.
   * This is the same as in AdminTicketsPage.tsx
   * The only difference is that we use UserService instead of TicketService
   */
  useEffect(() => {
    const getTickets = async () => {
      const data = await UserService.getAllUsers();
      setAllUsers(data);
      setUsers(data);
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
      setUsers(allUsers.filter((user) => user.level === UserLevel.USER));
      setActiveButtonIndex(value);
    } else if (value === 'Closed') {
      setUsers(allUsers.filter((user) => user.level >= UserLevel.ADMIN));
      setActiveButtonIndex(value);
    } else {
      setUsers(allUsers);
      setActiveButtonIndex(value);
    }
  };

  const handleSortButton = (status: string) => {
    if (status === 'Open') {
      setUsers(allUsers.filter((user) => user.level === UserLevel.USER));
      setActiveButtonIndex(status);
    } else if (status === 'Closed') {
      setUsers(allUsers.filter((user) => user.level >= UserLevel.ADMIN));
      setActiveButtonIndex(status);
    } else {
      setUsers(allUsers);
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
      setUsers(allUsers);
    } else {
      setUsers(
        allUsers.filter((ticket) => ticket.id.toString().includes(value)),
      );
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-start gap-4">
      <div className="flex justify-center">
        <h1 className="text-center text-lg font-medium">Users</h1>
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
              <option>Regular</option>
              <option>Admin</option>
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
              Regular
            </Button>
            <Button
              color="gray"
              className={
                activeButtonIndex === 'Closed' ? 'bg-blue-100' : 'bg-white'
              }
              onClick={() => handleSortButton('Closed')}
            >
              Admin
            </Button>
          </Button.Group>
        )}
        <div>
          <TextInput
            id="searchid"
            type="searchtype"
            rightIcon={HiSearch}
            placeholder="USER ID"
            required={false}
            onChange={handleSearch}
          />
        </div>
      </div>
      {/* DESKTOP VIEW */}
      <div className="-mb-4 flex w-full flex-col border-b-2 border-slate-500">
        <div className="grid grid-flow-col grid-cols-10 gap-x-1 text-lg font-semibold">
          <p className="col-span-5 ml-3 lg:col-span-3">ID</p>
          <p className="col-span-4 lg:col-span-6">User</p>
          <p className="col-span-1 text-center">Status</p>
        </div>
      </div>
      {/* END OF DESKTOP VIEW */}
      <div className="flex w-full flex-col divide-y-2 divide-slate-100">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
