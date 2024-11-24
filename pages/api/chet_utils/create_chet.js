import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { token_user_details } from "../user_utils/create_user";
const prisma = new PrismaClient();

export async function createChet(req) {
  try {
    const { current_user, selected_chet, messages } = req.body;
    const chet = await prisma.chetModel.create({
      data: {
        senderId: parseInt(current_user, 10),
        receiverId: parseInt(selected_chet, 10),
        message: { sender: current_user, text: messages },
      },
    });
    return { success: chet };
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
