import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import path from "path"
import { app, server } from './socket/socket.js'
dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

const PORT = process.env.PORT || 3000;
// const __dirname = path.resolve();
// creating express application
// const app = express();

app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies'

// get route verify the running of application
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * we have 2 routes
 * 1. auth routes for user to login and signup
 * 2. chat api routes
 */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

// if(process.env.NODE_ENV !== "development") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*", (req,res) => {
//     res.sendFile(path.join(__dirname, "frontend","dist","index.html"));
//   })
// }

// now serving server application on port

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
