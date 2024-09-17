import { getUser } from '@/server';
import { IUserDetails } from '@/types';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface IAuthProvider {
  children: ReactNode;
}
interface IAuthContext {
  user: IUserDetails | null;
  refreshAuth: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({ user: null, refreshAuth: async () => {} });
export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUserDetails | null>(null);

  const refreshAuth = async () => {
    const userData = await getUser();
    setUser(userData);
  };

  useEffect(() => {
    refreshAuth();
  }, []);
  return <AuthContext.Provider value={{ user, refreshAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
