"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_js_1 = require("../controller/auth.controller.js");
const protectRoutes_js_1 = __importDefault(require("../middleware/protectRoutes.js"));
const router = express_1.default.Router();
router.get("/me", protectRoutes_js_1.default, auth_controller_js_1.getUser);
router.post("/login", auth_controller_js_1.login);
router.post("/signup", auth_controller_js_1.signup);
router.post("/logout", auth_controller_js_1.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map