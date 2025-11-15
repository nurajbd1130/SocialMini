
import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

// In a real app, this would come from an environment variable
const SOCKET_SERVER_URL = 'http://localhost:3001';

export const useSocket = (userId: string | undefined) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Connect to the socket server
    const socket = io(SOCKET_SERVER_URL, {
      query: { userId },
      transports: ['websocket']
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected:', socket.id);
      socket.emit('join', `user_${userId}`);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  return { socket: socketRef.current, isConnected };
};
