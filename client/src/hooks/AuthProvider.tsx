import { createContext, useContext, useEffect, useState } from 'react';
import { UserInfo } from '../model/User';
import UserService from '../services/UserService';

/**
 * This interface is used to define the properties of the AuthContext.
 * @interface AuthContextProps
 * @property {UserInfo} user - The current user.
 * @property {boolean} loading - Whether the user is loading.
 * @property {(username: string, password: string) => Promise<void>} login - The login function.
 * @property {(username: string, password: string) => Promise<void>} register - The register function.
 * @property {() => Promise<void>} logout - The logout function.
 * @memberof AuthProvider
 */
interface AuthContextProps {
  user?: UserInfo;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = createContext<AuthContextProps>(null!);

interface Props {
  children: React.ReactNode;
}

/**
 * This component is used to provide the AuthContext.
 * Not sure how it all works but Emil can probably fill in.
 * @param {Props} props - The props of the component.
 * @param {React.ReactNode} props.children - The children of the component.
 * @returns {JSX.Element} - The AuthProvider component.
 * @memberof AuthProvider
 */

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserInfo | undefined>();
  const [loading, setLoading] = useState(true);

  const login = async (username: string, password: string) => {
    setLoading(true);
    const currentUser = await UserService.login(username, password);
    setUser(currentUser);
    setLoading(false);
  };

  const register = async (username: string, password: string) => {
    setLoading(true);
    const newUser = await UserService.register(username, password);
    setUser(newUser);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await UserService.logout();
    setUser(undefined);
    setLoading(false);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { login, register, logout, user, loading };

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const currentUser = await UserService.getUser();
      setUser(currentUser);
      setLoading(false);
    };
    getUser();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * This hook is used to get the AuthContext.
 * @returns {AuthContextProps} - The AuthContext.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
