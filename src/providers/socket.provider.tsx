import { TSocket } from '@/types';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    const socket: TSocket = io(process.env.NEXT_PUBLIC_SERVER_URL!);
    socket.on('connect', () => {
      console.log('Socket ', socket.id);
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
