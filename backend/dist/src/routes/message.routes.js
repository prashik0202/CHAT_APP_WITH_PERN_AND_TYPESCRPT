"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoutes_js_1 = __importDefault(require("../middleware/protectRoutes.js"));
const messsge_controller_js_1 = require("../controller/messsge.controller.js");
const router = express_1.default.Router();
router.get("/conversation", protectRoutes_js_1.default, messsge_controller_js_1.getUserForSidebar);
router.get("/:id", protectRoutes_js_1.default, messsge_controller_js_1.getMessages);
router.post("/send/:id", protectRoutes_js_1.default, messsge_controller_js_1.sendMessage);
exports.default = router;
//# sourceMappingURL=message.routes.js.map