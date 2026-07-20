import { io } from "socket.io-client";

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL || "/", {
      withCredentials: true,
      autoConnect: true,
    });
  }
  return socket;
}

export function joinUserRoom(userId) {
  const socketInstance = getSocket();
  if (socketInstance) {
    socketInstance.emit("join", `user:${userId}`);
  }
}
