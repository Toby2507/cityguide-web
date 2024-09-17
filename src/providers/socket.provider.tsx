import { getUser } from '@/server';
import { TSocket } from '@/types';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface ISocketProvider {
  children: ReactNode;
}
interface ISocketContext {
  socket: TSocket | null;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({ socket: null, isConnected: false });
export const SocketProvider = ({ children }: ISocketProvider) => {
  const [socket, setSocket] = useState<TSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const setUpSocket = useCallback(async () => {
    const user = await getUser();
    const userId = user?.id;
    const socket: TSocket = io(process.env.NEXT_PUBLIC_SERVER_URL!);
    socket.on('connect', () => {
      setIsConnected(true);
      if (userId) socket.emit('add_user', userId);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    setSocket(socket);
    return socket;
  }, []);

  useEffect(() => {
    let socketInstance: TSocket;
    setUpSocket().then((newSocket) => {
      socketInstance = newSocket;
    });
    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
  }, [setUpSocket]);
  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
