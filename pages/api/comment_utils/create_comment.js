import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { token_user_details } from "../user_utils/create_user";
const prisma = new PrismaClient();

export async function createCommant(req) {
  try {
    let user;
    const token = req?.headers["authorization"]?.split(" ")[1];

    if (token) {
      user = await token_user_details(token);
    } else {
      const { comment, thesisId } = req.body;
      user = await prisma.comment.create({
        data: {
          comment,
          userId: user.id,
          thesisId,
        },
      });
    }
    return user;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
