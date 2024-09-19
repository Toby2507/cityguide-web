'use client';

import { TSocket } from '@/types';
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './auth.provider';

interface ISocketProvider {
  children: ReactNode;
}
interface ISocketContext {
  socket: TSocket | null;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({ socket: null, isConnected: false });
export const SocketProvider = ({ children }: ISocketProvider) => {
  const socketRef = useRef<TSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { user } = useAuth();

  const setUpSocket = useCallback(async () => {
    if (socketRef.current) socketRef.current.disconnect();
    const socket: TSocket = io(process.env.NEXT_PUBLIC_SERVER_URL!);
    socket.on('connect', () => {
      setIsConnected(true);
      if (user?.id) socket.emit('add_user', user.id);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socketRef.current = socket;
  }, [user?.id]);

  useEffect(() => {
    setUpSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [setUpSocket]);
  return <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
