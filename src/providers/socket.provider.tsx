'use client';

import { TSocket } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
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
    socket.on('restaurant_menu', ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ['restaurant', id] });
      queryClient.invalidateQueries({ queryKey: ['trending-restaurants'] });
    });
    socket.on('stay_acc', ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ['stay', id] });
      queryClient.invalidateQueries({ queryKey: ['trending-stays'] });
    });
    socket.on('update_property', ({ id, type }) => {
      queryClient.invalidateQueries({ queryKey: [type.toLowerCase(), id] });
    });
    socket.on('delete_property', ({ id, type }) => {
      queryClient.invalidateQueries({ queryKey: [type.toLowerCase(), id] });
      queryClient.invalidateQueries({ queryKey: [`trending-${type.toLowerCase()}s`] });
    });
    socket.on('new_reservation', () => {
      queryClient.invalidateQueries({ queryKey: ['reservations', 'admin'] });
    });
    socketRef.current = socket;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
