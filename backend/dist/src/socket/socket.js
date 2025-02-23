"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = exports.app = exports.getReceiverSocketId = void 0;
/**
 * import Server form socket for real-time binding
 * http inbuilt module to create server
 * express for handle http request
 */
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
// create a express app
const app = (0, express_1.default)();
exports.app = app;
// creating a http server using express
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL, //allowing request from specified origin
        methods: ["GET", "POST"], // http methods allow for corsorign request
    },
});
exports.io = io;
/**
 * Function to get the socket ID of specific user based on their user id
 * this is useful for sending targeted events to paticular user
 */
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
exports.getReceiverSocketId = getReceiverSocketId;
// Object to store a mapping between user IDs and their respective Socket IDs.
// Example: { userId1: socketId1, userId2: socketId2 }
const userSocketMap = {};
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
    }
    // notify all connected clients about the updated list of users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    //Listening foe disconnect event triggered when user disconnects
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
    socket.on("error", (error) => {
        console.log(error);
        socket.disconnect();
    });
});
//# sourceMappingURL=socket.js.map