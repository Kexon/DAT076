import { createContext, useContext, useState } from 'react';
import { UserInfo } from '../model/User';

interface AuthContextProps {
  user?: UserInfo;
}

const AuthContext = createContext<AuthContextProps>(null!);

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserInfo | undefined>();
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
