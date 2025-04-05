import { Server } from "socket.io";
import { User } from "./models/user.model.js";
import jwt from "jsonwebtoken";

const users = {}; // Stores userId -> socketId mappings

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.headers.cookie
      ?.split("; ")[0]
      .split("accessToken=")[1];

    console.log(token);

    if (!token) {
      console.log("No token provided, rejecting connection.");
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded._id).select("name email");
      console.log(user);

      if (!user) {
        console.log("Invalid user");
        return next(new Error("Authentication error"));
      }

      socket.user = user;
      console.log(`✅ WebSocket Authenticated: ${user.email} (${socket.id})`);
      next();
    } catch (error) {
      console.log("WebSocket Authentication Failed: ", error);
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user._id.toString();
    const userName = socket.user.email.split("@")[0];
    users[socket.id] = userId;

    console.log(`✅ User Connected: ${userName} (${socket.id})`);

    socket.on("checkOnline", (data) => {
      const id = data._id;
      let isOnline = false;

      for (let socketId in users) {
        if (users[socketId] === id) {
          isOnline = true;
          break;
        }
      }
      socket.emit("userOnlineStatus", { id, isOnline });
      console.log(`Checking if user ${userId} is online: ${isOnline}`);
    });

    socket.on("chat", (data) => {
      const roomId = [data._id, userId].sort().join("_");
      socket.join(roomId);
      console.log(`User ${userId} joined private chat room ${roomId}`);
    });

    socket.on("sendMessage", async (data) => {});

    /*** 📌 DISCONNECT ***/
    socket.on("disconnect", () => {
      delete users[socket.id];
      console.log(`❌ User Disconnected: ${socket.user.name} (${socket.id})`);
    });
  });

  return io;
};
