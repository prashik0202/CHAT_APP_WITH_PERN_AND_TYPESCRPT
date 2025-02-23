"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// import path from "path"
const socket_js_1 = require("./socket/socket.js");
dotenv_1.default.config();
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const message_routes_js_1 = __importDefault(require("./routes/message.routes.js"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 3000;
// const __dirname = path.resolve();
// creating express application
// const app = express();
socket_js_1.app.use(express_1.default.json()); // for parsing application/json
socket_js_1.app.use((0, cookie_parser_1.default)()); // for parsing cookies'
// get route verify the running of application
socket_js_1.app.get("/", (req, res) => {
    res.send("Hello World!");
});
/**
 * we have 2 routes
 * 1. auth routes for user to login and signup
 * 2. chat api routes
 */
socket_js_1.app.use("/api/v1/auth", auth_routes_js_1.default);
socket_js_1.app.use("/api/v1/messages", message_routes_js_1.default);
if (process.env.NODE_ENV !== "development") {
    socket_js_1.app.use(express_1.default.static(path_1.default.join(__dirname, "/frontend/dist")));
    socket_js_1.app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "frontend", "dist", "index.html"));
    });
}
// now serving server application on port
socket_js_1.server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
//# sourceMappingURL=index.js.map