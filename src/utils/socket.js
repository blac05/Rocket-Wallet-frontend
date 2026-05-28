import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
let socket = null;

export const getSocket = () => {
  if (!socket) {
    let token = '';
    try {
      const stored = JSON.parse(localStorage.getItem('rocket-wallet-v1') || '{}');
      token = stored?.state?.token || '';
    } catch (_) {}

    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });
    socket.on('connect',    () => console.log('🚀 Socket connected:', socket.id));
    socket.on('disconnect', () => console.log('Socket disconnected'));
    socket.on('connect_error', (e) => console.warn('Socket error:', e.message));
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) { socket.disconnect(); socket = null; }
};

export default getSocket;
