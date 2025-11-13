import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL, {
      transports: ["websocket"],
      autoConnect: false, // prevent connection on import
    });

    socket.connect(); // connect now
    socket.emit("registerUser", userId);
  }
  return socket;
};
export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
