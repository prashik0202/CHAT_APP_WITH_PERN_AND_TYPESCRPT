/**
 * import Server form socket for real-time binding
 * http inbuilt module to create server
 * express for handle http request
 */
import { Server } from "socket.io";
import http from "http";
import express from "express";

// create a express app
const app = express();

// creating a http server using express
const server = http.createServer(app);

const io = new Server(server, {
  cors : {
    origin : "https://chatapprash.vercel.app", //allowing request from specified origin 
    methods : ["GET","POST"], // http methods allow for corsorign request
  }
});

/**
 * Function to get the socket ID of specific user based on their user id
 * this is useful for sending targeted events to paticular user
 */
export const getReceiverSocketId = (receiverId : string) => {
  return userSocketMap[receiverId];
}

// Object to store a mapping between user IDs and their respective Socket IDs.
// Example: { userId1: socketId1, userId2: socketId2 }
const userSocketMap: { [key: string]: string } = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;

  if(userId){
    userSocketMap[userId] = socket.id;
  }

  // notify all connected clients about the updated list of users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //Listening foe disconnect event triggered when user disconnects
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  socket.on("error", (error) =>  {
    console.log(error);
    socket.disconnect();
  })
});

export { app, io, server };