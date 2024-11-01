import { Server } from "socket.io";
import { corsConfig } from "./constants";
let io: any;

export const init = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: corsConfig
  });
  return io;
}

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized..!");
  }
  return io;
}