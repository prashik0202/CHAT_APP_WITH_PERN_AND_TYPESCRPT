"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserForSidebar = exports.getMessages = exports.sendMessage = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const socket_1 = require("../socket/socket");
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        let conversation = await prisma_1.default.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, receiverId],
                }
            }
        });
        // very first conversation
        if (!conversation) {
            conversation = await prisma_1.default.conversation.create({
                data: {
                    participantsIds: {
                        set: [senderId, receiverId],
                    },
                },
            });
        }
        const newMessage = await prisma_1.default.message.create({
            data: {
                senderId,
                body: message,
                coversationId: conversation.id
            }
        });
        if (newMessage) {
            conversation = await prisma_1.default.conversation.update({
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
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(receiverId);
        if (receiverSocketId) {
            socket_1.io.to(receiverSocketId).emit('newMessage', newMessage);
        }
        res.status(200).json(newMessage);
    }
    catch (error) {
        console.error("Error in sendMessage: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.sendMessage = sendMessage;
const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;
        const conversation = await prisma_1.default.conversation.findFirst({
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
};
exports.getMessages = getMessages;
const getUserForSidebar = async (req, res) => {
    try {
        const AuthUserId = req.user.id;
        const users = await prisma_1.default.user.findMany({
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
};
exports.getUserForSidebar = getUserForSidebar;
