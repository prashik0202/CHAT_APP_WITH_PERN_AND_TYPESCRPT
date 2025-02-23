"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserForSidebar = exports.getMessages = exports.sendMessage = void 0;
const prisma_js_1 = __importDefault(require("../db/prisma.js"));
const socket_js_1 = require("../socket/socket.js");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        let conversation = yield prisma_js_1.default.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, receiverId],
                }
            }
        });
        // very first conversation
        if (!conversation) {
            conversation = yield prisma_js_1.default.conversation.create({
                data: {
                    participantsIds: {
                        set: [senderId, receiverId],
                    },
                },
            });
        }
        const newMessage = yield prisma_js_1.default.message.create({
            data: {
                senderId,
                body: message,
                coversationId: conversation.id
            }
        });
        if (newMessage) {
            conversation = yield prisma_js_1.default.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    message: {
                        connect: {
                            id: newMessage.id
                        }
                    }
                }
            });
        }
        const receiverSocketId = (0, socket_js_1.getReceiverSocketId)(receiverId);
        if (receiverSocketId) {
            socket_js_1.io.to(receiverSocketId).emit('newMessage', newMessage);
        }
        res.status(200).json(newMessage);
    }
    catch (error) {
        console.error("Error in sendMessage: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.sendMessage = sendMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;
        const conversation = yield prisma_js_1.default.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, userToChatId],
                },
            },
            include: {
                message: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
        if (!conversation) {
            res.status(200).json([]);
            return;
        }
        res.status(200).json(conversation.message);
    }
    catch (error) {
        console.error("Error in getMessages: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getMessages = getMessages;
const getUserForSidebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AuthUserId = req.user.id;
        const users = yield prisma_js_1.default.user.findMany({
            where: {
                id: {
                    not: AuthUserId,
                },
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: "Internal Server Error!" });
        }
    }
});
exports.getUserForSidebar = getUserForSidebar;
//# sourceMappingURL=messsge.controller.js.map