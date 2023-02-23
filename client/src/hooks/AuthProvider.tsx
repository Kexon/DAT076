import { createContext, useContext, useEffect, useState } from 'react';
import { UserInfo } from '../model/User';
import UserService from '../services/UserService';

interface AuthContextProps {
  user?: UserInfo;
  login: (username: string, password: string) => Promise<void>;
  loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = createContext<AuthContextProps>(null!);

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserInfo | undefined>();
  const [loading, setLoading] = useState(true);

  const login = async (username: string, password: string) => {
    setLoading(true);
    const currentUser = await UserService.login(username, password);
    setUser(currentUser);
    setLoading(false);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { login, user, loading };

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
