import { io } from 'socket.io-client';

let socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io('http://localhost:5000'); // Adjust URL if deployed
  }
  return socket;
};
