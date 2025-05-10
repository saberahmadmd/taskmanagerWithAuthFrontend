export const initializeSocket = () => {
  if (!socket) {
    const socketUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
    socket = io(socketUrl);
  }
  return socket;
};
