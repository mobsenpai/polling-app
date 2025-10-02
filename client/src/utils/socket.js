// utils/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL; 

// Create socket instance
export const socket = io(SOCKET_URL, {
  withCredentials: true, // allows cookies if you use auth
  transports: ["websocket"], // better performance than polling
  autoConnect: false, // we’ll connect manually when needed
});
