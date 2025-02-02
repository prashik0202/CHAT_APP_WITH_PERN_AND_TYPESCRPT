import { Request, response, Response } from 'express'
import prisma from '../db/prisma.js'
import {getReceiverSocketId, io} from '../socket/socket.js';

export const sendMessage = async(req: Request , res : Response) => {
  try {
    const { message } = req.body;
    const { id : receiverId } = req.params;

    const senderId = req.user.id;

    let conversation = await prisma.conversation.findFirst({
      where : {
        participantsIds : {
          hasEvery : [senderId, receiverId],
        }
      }
    });


    // very first conversation
    if (!conversation) {
			conversation = await prisma.conversation.create({
				data: {
					participantsIds: {
						set: [senderId, receiverId],
					},
				},
			});
		}

    const newMessage = await prisma.message.create({
      data : {
        senderId,
        body : message,
        coversationId : conversation.id
      }
    });

    if(newMessage){
      conversation = await prisma.conversation.update({
        where : {
          id : conversation.id
        },
        data : {
          message : {
            connect : {
              id : newMessage.id
            }
          }
        }
      })
    }

    const receiverSocketId = getReceiverSocketId(receiverId);

    if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(200).json(newMessage);


  } catch (error : any) {
    console.error("Error in sendMessage: ", error.message);
		res.status(500).json({ error: "Internal server error" });
  }
} 

export const getMessages =  async(req : Request, res : Response) => {
  try {
		const { id: userToChatId } = req.params;
		const senderId = req.user.id;

		const conversation = await prisma.conversation.findFirst({
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
	} catch (error: any) {
		console.error("Error in getMessages: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const getUserForSidebar = async(req : Request , res : Response ) => {
  try {
    const AuthUserId = req.user.id;

    const users = await prisma.user.findMany({
      where : {
        id : {
          not : AuthUserId,
        },
      },
      select : {
        id : true,
        fullName : true,
        profilePic : true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    if(error instanceof Error ) {
      res.status(500).json({ error : "Internal Server Error!"});
    }
  }
}