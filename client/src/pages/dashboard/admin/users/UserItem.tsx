import { UserInfo, UserLevel } from '../../../../model/User';

interface Props {
  user: UserInfo;
}

/**
 *  This component is used to display a user in the AllUsersPage.tsx
 * @param user The user to display
 * @returns A component that displays a user
 */
export default function UserItem({ user }: Props) {
  const { id, username, level } = user;

  const userLevel = () => {
    switch (level) {
      case UserLevel.USER:
        return 'User';
      case UserLevel.ADMIN:
        return 'Admin';
      case UserLevel.SUPER_ADMIN:
        return 'S. Admin';
      default:
        return 'User';
    }
  };
  return (
    <div>
      <div className="grid grid-flow-col grid-cols-10 items-center gap-x-1 py-2 hover:bg-slate-300">
        <p className="col-span-5 ml-2 h-6 truncate text-left lg:col-span-3">
          {id}
        </p>
        <p className="col-span-4 h-6 truncate text-left lg:col-span-6">
          {username}
        </p>
        <p className="col-span-1 text-center text-sm">{userLevel()}</p>
      </div>
    </div>
  );
}
