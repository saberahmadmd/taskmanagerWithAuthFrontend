import { io } from 'socket.io-client';

let socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io('https://taskmanagerwithauthbackend.onrender.com'); // Adjust URL if deployed
  }
  return socket;
};
