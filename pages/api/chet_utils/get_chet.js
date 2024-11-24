import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getChet(req) {
  const current_user = parseInt(req.query["current_user"], 10); // Base 10 conversion
  const receiver = parseInt(req.query["receiver"], 10);

  try {
    const chet = await prisma.chetModel.findMany({
      where: {
        OR: [
          {
            senderId: receiver,
            receiverId: current_user,
          },
          {
            senderId: current_user,
            receiverId: receiver,
          },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
    return chet;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
